import { acceptHMRUpdate, defineStore } from 'pinia'
import { GroupState } from '~/types/types'
import { v4 as uuid } from "uuid";
import { io, Socket } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents } from "types/types";

import order from '~/content/order.yml'

let SOCK: Socket<ServerToClientEvents, ClientToServerEvents> = io('/', {autoConnect: false})

export const useGroupStore = defineStore('groupStore', {
  state: (): GroupState => ({
    loading: true,
    connected: false,
    groupid: '[undefined]',
    position: 0,
    users: [],
    mounted: false,
    finished: {},
    started: []
  }),
  actions: {
    async init() {
      this.mounted = true
      // composable injection
      const { choose } = useNotify()
      const router = useRouter()
      // start
      const self = this
      // not on the server please...
      if (process.server) { return false }
      // load localstorage and check if group already exists
      const group = JSON.parse(localStorage.getItem('widt-group') || '{}')
      // TODO: group is valid for one day?
      // if (group && group.groupid && group.timestamp && group.timestamp > Date.now() - (24 * 60 * 60 * 1000)) {
        const choice = await choose(
          "Je bent op deze computer al eerder een groep begonnen. Wil je met deze groep doorgaan of een nieuwe groep starten?", { choices: ["nieuwe start", "doorgaan"] }
        );
        if (typeof choice === "string" && choice === 'doorgaan') {
          this.groupid = group.groupid
        } else {
          // start over
          this.position = 0;
          this.users = []
          this.finished = {}
          this.started = []
          // create group id
          this.groupid = uuid();
          const router = useRouter()
          router.push('/')
        }
      // } else {
      //   // start over
      //   this.position = 0;
      //   this.users = []
      //   this.finished = {}
      //   this.started = []
      //   // create group id
      //   this.groupid = uuid();
      // }

      const config = useRuntimeConfig()
      SOCK = io(config.public.URL + config.public.BASE)

      // connection status
      SOCK.on('connect', function () { 
        self.connected = true 
        // always join room on connect
        SOCK.emit('joinRoom', { groupid: self.groupid })
        // retrieve all user data
        SOCK.emit('getAllUserData', { groupid: self.groupid })
        // retrieve all user data
        SOCK.emit('getGroupData', { groupid: self.groupid })
      });
      // notifications:
      SOCK.on('error', function () {
        console.warn('ERROR!')
      })
      SOCK.on('ping', function () {
        console.warn('ping!')
      })
      SOCK.on('reconnect', function () {
        console.warn('reconnect!')
      })
      SOCK.on('reconnect_attempt', function () {
        console.warn('reconnect_attempt!')
      })
      SOCK.on('reconnect_error', function () {
        console.warn('reconnect_error!')
      })
      SOCK.on('reconnect_failed', function () {
        console.warn('reconnect failed!')
      })

      // custom events
      SOCK.on('goto', (position) => {
        const router = useRouter()
        if (order[position].group !== null) {
          router.push('/groep/' + order[position].group)
          self.position = position
        }
      })
      SOCK.on('addUser', ({ userid, groupid, name }) => {
        // check if user exists
        this.users.push({userid, groupid, name, answers: {}})
      })
      SOCK.on('groupUserData', (data) => {
        this.users = data
      })
      SOCK.on('loadGroupData', (data) => {
        if (data.finished) { this.finished = data.finished }
        if (data.started) { this.started = data.started }
      })
      SOCK.on('setStartChapter', ({ userid, name, groupid }) => {
        if (!self.started.includes(name)) {
          self.started.push(name)
        }
      })
      SOCK.on('setUnStartChapter', ({ userid, name, groupid }) => {
        if (self.started.includes(name)) {
          self.started.splice(self.started.indexOf(name), 1)
        }
      })
      SOCK.on('setFinished', ({ userid, name, groupid }) => {
        if (!(name in self.finished)) { self.finished[name] = [userid] }
        if (!self.finished[name].includes(userid)) { self.finished[name].push(userid) }
      })
      SOCK.on('setUnFinished', ({ userid, name, groupid }) => {
        if (!(name in self.finished)) { self.finished[name] = [] }
        if (self.finished[name].includes(userid)) { self.finished[name].splice(self.finished[name].indexOf(userid), 1) }
      })
      SOCK.on('setDone', ({ userid, chapter, groupid }) => {
        const user = this.users.find(x => x.userid === userid)
        if (user && user.done.includes(chapter)) {
          user.done.push(chapter)
        }
      })
      SOCK.on('setUnDone', ({ userid, chapter, groupid }) => {
        const user = this.users.find(x => x.userid === userid)
        if (user && user.done.includes(chapter)) {
          user.done.splice(user.done.indexOf(chapter), 1)
        }
      })
      SOCK.on('updateAnswer', ({ userid, chapter, k, answer }) => {
        const user = self.users.find(x => x.userid === userid)
        if (user) {
          if (!user.answers) { user.answers = {} }
          if (!user.answers[chapter]) { user.answers[chapter] = [] }
          user.answers[chapter][k] = answer
        }
      })
      
      // do something?
      SOCK.on('disconnect', function() { self.connected = false });
      
      this.loading = false

      this.saveToLocalStorage()
      
    },
    startChapter (name: string) {
      SOCK.emit('startChapter', {groupid: this.groupid, name})
    },
    unStartChapter (name: string) {
      SOCK.emit('unStartChapter', {groupid: this.groupid, name})
    },
    reset() {
      this.groupid = uuid();
      this.saveToLocalStorage()
    },
    prev() {
      SOCK.emit('prev', { groupid: this.groupid})
    },
    next(position?:number) {
      SOCK.emit('next', { groupid: this.groupid, position })
    },
    test () {
      SOCK.emit('test', {data: 'testdata'})
    },
    saveToLocalStorage() {
      if (this.groupid) {
        localStorage.setItem('widt-group', JSON.stringify({groupid: this.groupid, timestamp: Date.now()}))
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGroupStore, import.meta.hot))
}
