import {useEffect} from "react";
import {ResponseResult} from "../types/response";
import {isLogin} from "../utils/session";

const io = require('socket.io-client')
const PubSub = require('pubsub-js')

let socket: any = null

export const SocketTopic = {
    connectionState: "connectionState",
    upgradeStatus: "upgradeStatus",
    alert: "alert"
}

const useSocket = () => {

    if (isLogin()) {
        if (!socket) {
            socket = io.connect(":8291/", {
                transports: ["websocket"]
            })
        }
    }

    useEffect(() => {
        if (socket) {
            socket.on("ready", (data: any) => {
                console.log(data)
            })
            socket.on('socket::deviceStateChangedEvent', (res: ResponseResult<any>) => {
                if (res.code === 200) {
                    PubSub.publish(SocketTopic.connectionState, {
                        macAddress: res.data.macAddress,
                        isOnline: res.data.state.isOnline,
                        connectAt: res.data.state.connectedAt
                    })
                }
            })
            socket.on('socket::deviceUpgradeStatusChangedEvent', (res: ResponseResult<any>) => {
                if (res.code === 200) {
                    PubSub.publish(SocketTopic.upgradeStatus, {
                        macAddress: res.data.macAddress,
                        code: res.data.code,
                        progress: res.data.progress,
                    })
                }
            })
            socket.on("socket::measurementAlertMessage", (res: ResponseResult<any>) => {
                if (res.code === 200) {
                    PubSub.publish(SocketTopic.alert, res.data)
                }
            })
        }
    }, [socket])
    return {
        PubSub
    }
}

export default useSocket