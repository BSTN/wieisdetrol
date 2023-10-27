import { acceptHMRUpdate, defineStore } from 'pinia'
import { UserState } from '~/types/types'
import { identicon } from "minidenticons";
import { io, Socket } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents, USER, Answer } from "types/types";
import order from '~/content/order.yml'

let SOCK: Socket<ServerToClientEvents, ClientToServerEvents> = io('/' ,{autoConnect: false})

function asyncEmit(func: keyof ClientToServerEvents, data?:any) {
  return new Promise((resolve) => {
    SOCK.emit(func, data, (returnData?:any) => {
      resolve(returnData)
    })
  })
}

export const useUserStore = defineStore('userStore', {
  state: (): UserState => ({
    mounted: false,
    loading: true,
    connected: false,
    groupid: '[undefined]',
    userid: '',
    name: '',
    position: 0,
    creating: false,
    users: [],
    answers: {},
    done: [],
    finished: [],
    started: [],
    showResults: []
  }),
  getters: {
    icon(state): string {
      return state.userid ? identicon(state.userid, 50, 50) : '';
    },
    user(state) {
      return {
        userid: state.userid,
        name: state.name,
      }
    },
    getAnswer(state) {
      return ({ chapter, k }:{chapter:string, k: number}) => {
        return state.answers[chapter] ? state.answers[chapter][k] : null
      }
    },
    getChapterPosition(state) {
      return (chapter: string) => {
        return state.answers[chapter] ? state.answers[chapter].length - 1 : -1
      }
    }
  },
  actions: {
    init() {
      this.mounted = true
      const self = this
      const route = useRoute();
      const router = useRouter();
      if (process.server) { return false }
      // load localstorage and check if group already exists
      const user = JSON.parse(localStorage.getItem('widt-user') || '{}')
      // if (user && user.timestamp && user.timestamp > Date.now() - (24 * 60 * 60 * 1000)) {
      if (user) {
        this.groupid = user.groupid
        this.userid = user.userid
        this.name = user.name
        this.answers = user.answers
      }
      // TODO:
      if (route.query.id && user.groupid !== route.query.id) {
        this.groupid = String(route.query.id) || '[undefined]'
        this.userid = ''
        this.name = ''
        this.answers = {}
        this.position = 0
        this.saveToLocalStorage()
      }
      // init socket
      const config = useRuntimeConfig()
      SOCK = io(config.public.URL + config.public.BASE, {transports: ['polling']})
      
      // connection status
      SOCK.on('connect', async function () {
        console.log('%c Socket connected.', 'color:yellow;')
        // join the room
        if (self.groupid !== '[undefined]' && self.userid !== '') {
          SOCK.emit('joinRoom', {
            groupid: self.groupid,
            userid: self.userid
          })
        }
        SOCK.emit('getGroupData', {groupid: self.groupid})
        SOCK.emit('getAllUserData', {groupid: self.groupid})
        SOCK.emit('getUserData', {userid: self.userid, groupid: self.groupid, name: self.name}, (user) => {
          if (user) {
            self.userid = user.userid
            self.done = user.done
            self.answers = user.answers
          }
        })
        self.connected = true
      });
      SOCK.on('disconnect', function () { self.connected = false });

      SOCK.on('groupUserData', (data: Array<USER>) => {
        // are we using this? yes, compare the results. thanks.
        this.users = data 
      })

      SOCK.on('addUser', (data) => {
        console.log('Add User!', data)
      })

      SOCK.on('loadGroupData', (data) => {

        this.started = data.started
        
        self.finished = data.finished
        self.started = data.started
        self.showResults = data.showResults
        
        for (let i in data.users) {
          if (data.users[i].userid === self.userid) {
            self.done = data.users[i].done
          }
        }
      })

      SOCK.on('updateAnswer', ({userid, chapter, k, answer}) => {

        const user = self.users.find(user => user.userid === userid)
        if (!user){return false}
        user.answers[chapter][k] = answer
        
      })

      // message from socketmaster
      SOCK.on("goto", (position) => {
        // console.log('goto', position, order[position].user)
        console.log('goto', position)
        const router = useRouter()
        router.push('/deelnemer/' + order[position].user)
        self.position = position
        // navigateTo(order[position].user)
      });

      SOCK.on('setStartChapter', ({ chapter, groupid }) => {
        if (!self.started.includes(chapter)) {
          self.started.push(chapter)
        }
      })

      SOCK.on('setUnStartChapter', ({ chapter, groupid }) => {
        if (self.started.includes(chapter)) {
          self.started.splice(self.started.indexOf(chapter), 1)
        }
      })

      SOCK.on('setFinished', ({ chapter }) => {
        if (!self.finished.includes(chapter)) {
          self.finished.push(chapter)
        }
      })

      SOCK.on('setUnFinished', ({ chapter }) => {
        if (self.finished.includes(chapter)) {
          self.finished.splice(self.finished.indexOf(chapter), 1)
        }
      })

      SOCK.on('setShowResults', ({ groupid, chapter }) => {
        if (!self.showResults.includes(chapter)) { self.showResults.push(chapter)}
      })
      SOCK.on('setUnShowResults', ({ groupid, chapter }) => {
        if (self.showResults.includes(chapter)) { self.showResults.splice(self.showResults.indexOf(chapter), 1)}
      })

      SOCK.on('setDone', ({ chapter, userid }) => {
        if (userid !== self.userid) return false
        if (!self.done.includes(chapter)) {
          self.done.push(chapter)
        }
      })

      SOCK.on('setUnDone', ({ chapter, userid }) => {
        if (userid !== self.userid) return false
        if (self.done.includes(chapter)) {
          self.done.splice(self.done.indexOf(chapter), 1)
        }
      })

      this.loading = false

      this.saveToLocalStorage()
      
    },
    tempIcon(id: string) {
      return id ? identicon(id, 50, 50) : '';
    },
    setGroupid(id: string) {
      this.groupid = id
    },
    test() {
      SOCK.emit('test')
    },
    async setDone(chapter: string) {
      if (!this.done.includes(chapter)) { this.done.push(chapter) }
      SOCK.emit('setDone', { groupid: this.groupid, userid: this.userid, chapter})
    },
    async setUnDone(chapter: string) {
      if (this.done.includes(chapter)) {
        this.done.splice(this.done.indexOf(chapter), 1)
      }
      SOCK.emit('setUnDone', { groupid: this.groupid, userid: this.userid, chapter})
    },
    async setAnswer({ chapter, k, answer }: { chapter: string, k: number, answer: Answer }) {
      // create array if not exist
      if (!(chapter in this.answers)) { this.answers[chapter] = [] }
      // set answer locally
      this.answers[chapter][k] = answer
      // store locally
      this.saveToLocalStorage()
      // write to server
      SOCK.emit('setAnswer', {
        groupid: this.groupid,
        userid: this.userid,
        name: this.name,
        chapter,
        k,
        answer
      })
    },
    async reset() {
      // sure ?

      const { confirm } = useNotify()
      const sure = await confirm('Weet je zeker dat je het spel wilt verlaten?')
      if (sure) {
        const done = await asyncEmit('removeUser', { groupid: this.groupid, userid: this.userid })
        if (done) {
          this.userid = '';
          this.name = '';
          this.answers = {}
          this.saveToLocalStorage()
          const router = useRouter()
          router.push('/') // to landing page?
        }
      }
    },
    saveToLocalStorage() {
      if (this.groupid) {
        localStorage.setItem('widt-user', JSON.stringify({
          groupid: this.groupid,
          userid: this.userid,
          name: this.name,
          answers: this.answers,
          timestamp: Date.now()
        }))
      }
    },
    async createUser({ name, userid }:{ name: string, userid: string }) {
      const self = this
      self.creating = true
      const done = await asyncEmit('createUser', { userid, groupid: this.groupid, name })
      if (done) { 
        self.userid = userid
        self.name = name
        self.saveToLocalStorage()
      }
      return true
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
