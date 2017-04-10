const sdk = new WSDK();
const APP_KEY = 23354047;
const SYS_NAME = "system";

const im = {
  getSysName: () => {
    return SYS_NAME;
  },
  getNick: (luid) => {
    return sdk.Base.getNick(luid);
  },
  destroy: () => {
    sdk.Base.destroy();
  },
  login: (uid, pwd) => {
    return new Promise((resolve, reject) => {
      sdk.Base.login({
        uid: uid,
        appkey: APP_KEY,
        credential: pwd,
        timeout: 5000,
        success: (data) => {
           // {code: 1000, resultText: 'SUCCESS'}
           console.log('im login success', data);
           resolve(data);
        },
        error: (error) => {
           // {code: 1002, resultText: 'TIMEOUT'}
           console.log('im login fail', error);
           reject(error);
        },
      });
    });
  },
  logout: () => {
    return new Promise((resolve, reject) => {
      sdk.Base.logout({
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })
  },
  getUnreadMsgCount: (count) => {
    return new Promise((resolve, reject) => {
      sdk.Base.getUnreadMsgCount({
        count: count,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  },
  getRecentContact: (count) => {
    return new Promise((resolve, reject) => {
      sdk.Base.getRecentContact({
        count: count,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  },
  startListenAllMsg: () => {
    sdk.Base.startListenAllMsg();
  },
  stopListenAllMsg: () => {
    sdk.Base.stopListenAllMsg();
  },
  // single chat
  chat: {
    sendMsg: (touid, msg) => {
      return new Promise((resolve, reject) => {
        sdk.Chat.sendMsg({
          touid: touid,
          msg: msg,
          success: (data) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
          },
        });
      });
    },
    sendCustomMsg: (touid, msg, summary) => {
      return new Promise((resolve, reject) => {
        sdk.Chat.sendCustomMsg({
          touid: touid,
          msg: msg,
          summary: summary,
          success: (data) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
          },
        });
      });
    },
    getHistory: (touid, nextkey, count) => {
      return new Promise((resolve, reject) => {
        sdk.Chat.getHistory({
          touid: touid,
          nextkey: nextkey,
          count: count,
          success: (data) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
          },
        });
      });
    },
    setReadState: (touid) => {
      return new Promise((resolve, reject) => {
        sdk.Chat.setReadState({
          touid: touid,
          timestamp: Math.floor((+new Date())/1000),
          success: (data) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
          },
        });
      });
    },
    startListenMsg: (touid) => {
      return new Promise((resolve, reject) => {
        sdk.Chat.startListenMsg({
          touid: touid,
          success: (data) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
          },
        });
      });
    },
    stopListenMsg: () => {
      sdk.Chat.stopListenMsg();
    },
    getUserStatus: (uids) => {
      return new Promise((resolve, reject) => {
        sdk.Chat.getUserStatus({
          uids: uids,
          hasPrefix: true,
          success: (data) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
          },
        });
      });
    },
  },
  // tribe chat
  Tribe: {
    sendMsg: (tid, msg) => {
      return new Promise((resolve, reject) => {
        sdk.Tribe.sendMsg({
          tid: tid,
          msg: msg,
          success: (data) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
          },
        });
      });
    },
    getHistory: (tid, nextkey, count) => {
      return new Promise((resolve, reject) => {
        sdk.Tribe.getHistory({
          tid: tid,
          nextkey: nextkey,
          count: count,
          success: (data) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
          },
        });
      });
    },
    getTribeInfo: (tid) => {
      return new Promise((resolve, reject) => {
        sdk.Tribe.getTribeInfo({
          tid: tid,
          success: (data) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
          },
        });
      });
    },
    getTribeList: () => {
      return new Promise((resolve, reject) => {
        sdk.Tribe.getTribeInfo({
          tribeTypes: [0,1,2],
          success: (data) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
          },
        });
      });
    },
    getTribeMembers: (tid) => {
      return new Promise((resolve, reject) => {
        sdk.Tribe.getTribeMembers({
          tid: tid,
          success: (data) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
          },
        });
      });
    },
    responseInviteIntoTribe: (tid, recommender, validatecode, manager) => {
      return new Promise((resolve, reject) => {
        sdk.Tribe.responseInviteIntoTribe({
          tid: tid,
          recommender: recommender,
          validatecode: validatecode,
          manager: manager,
          success: (data) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
          },
        });
      });
    }
  },
}

export default im;
