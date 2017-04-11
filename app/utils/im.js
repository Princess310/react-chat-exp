const sdk = new WSDK();
const APP_KEY = 23354047;
const SYS_NAME = 'system';

const im = {
  getSysName: () => SYS_NAME,
  getNick: (luid) => sdk.Base.getNick(luid),
  destroy: () => {
    sdk.Base.destroy();
  },
  login: (uid, pwd) => (new Promise((resolve, reject) => {
    sdk.Base.login({
      uid,
      appkey: APP_KEY,
      credential: pwd,
      timeout: 5000,
      success: (data) => {
        console.log('im login success', data);
        resolve(data);
      },
      error: (error) => {
        console.log('im login error', error);
        reject(error);
      },
    });
  })),
  logout: () => (new Promise((resolve, reject) => {
    sdk.Base.logout({
      success: (data) => {
        resolve(data);
      },
      error: (error) => {
        reject(error);
      },
    });
  })),
  getUnreadMsgCount: (count) => (new Promise((resolve, reject) => {
    sdk.Base.getUnreadMsgCount({
      count,
      success: (data) => {
        resolve(data);
      },
      error: (error) => {
        reject(error);
      },
    });
  })),
  getRecentContact: (count) => (new Promise((resolve, reject) => {
    sdk.Base.getRecentContact({
      count,
      success: (data) => {
        resolve(data);
      },
      error: (error) => {
        reject(error);
      },
    });
  })),
  startListenAllMsg: () => {
    sdk.Base.startListenAllMsg();
  },
  stopListenAllMsg: () => {
    sdk.Base.stopListenAllMsg();
  },
  // single chat
  chat: {
    sendMsg: (touid, msg) => (new Promise((resolve, reject) => {
      sdk.Chat.sendMsg({
        touid,
        msg,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    sendCustomMsg: (touid, msg, summary) => (new Promise((resolve, reject) => {
      sdk.Chat.sendCustomMsg({
        touid,
        msg,
        summary,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    getHistory: (touid, nextkey, count) => (new Promise((resolve, reject) => {
      sdk.Chat.getHistory({
        touid,
        nextkey,
        count,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    setReadState: (touid) => (new Promise((resolve, reject) => {
      sdk.Chat.setReadState({
        touid,
        timestamp: Math.floor((new Date()) / 1000),
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    startListenMsg: (touid) => (new Promise((resolve, reject) => {
      sdk.Chat.startListenMsg({
        touid,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    stopListenMsg: () => {
      sdk.Chat.stopListenMsg();
    },
    getUserStatus: (uids) => (new Promise((resolve, reject) => {
      sdk.Chat.getUserStatus({
        uids,
        hasPrefix: true,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
  },
  // tribe chat
  Tribe: {
    sendMsg: (tid, msg) => (new Promise((resolve, reject) => {
      sdk.Tribe.sendMsg({
        tid,
        msg,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    getHistory: (tid, nextkey, count) => (new Promise((resolve, reject) => {
      sdk.Tribe.getHistory({
        tid,
        nextkey,
        count,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    getTribeInfo: (tid) => (new Promise((resolve, reject) => {
      sdk.Tribe.getTribeInfo({
        tid,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    getTribeList: () => (new Promise((resolve, reject) => {
      sdk.Tribe.getTribeInfo({
        tribeTypes: [0, 1, 2],
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    getTribeMembers: (tid) => (new Promise((resolve, reject) => {
      sdk.Tribe.getTribeMembers({
        tid,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
    responseInviteIntoTribe: (tid, recommender, validatecode, manager) => (new Promise((resolve, reject) => {
      sdk.Tribe.responseInviteIntoTribe({
        tid,
        recommender,
        validatecode,
        manager,
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    })),
  },
};

export default im;
