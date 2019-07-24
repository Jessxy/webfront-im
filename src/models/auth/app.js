import { queryAllApps } from '../../services/auth/app';

export default {
    namespace: 'appManagement',
    state: {
        list: [{
            key: '1',
            appCode: '0001',
            appName: '洲博通AEO海关认证',
            desc: '',
            status: 'ENABLE'
        }],
        editModel: { // 编辑视图
            showStatus: false, // 默认不显示
            confirmLoading: false, // 确认按钮loading状态
            title: '创建应用' // 标题
        },
        apps: []
    },


    effects: {
        /**
         * 查询所有app
         *
         * @param call
         * @param put
         */
            *queryAllApps({}, { call, put }) {
            const res = yield call(queryAllApps);
            if (res.data.resultCode === "ok") {
                yield put({
                    type: 'setApps',
                    payload: {
                        apps: res.data.content
                    }
                });
            }
        }
    },


    reducers: {
        /**
         * 是否显示
         *
         * @param state
         * @param action
         * @returns {{showStatus: (boolean|*)}}
         */
        setEditModel(state, action) {
            let payload = action.payload;

            let newState = {...state.editModel};
            if(payload.showStatus != undefined) {
                newState.showStatus = payload.showStatus;
            }
            if(payload.title != undefined) {
                newState.title = payload.title;
            }
            if(payload.confirmLoading != undefined) {
                newState.confirmLoading = payload.confirmLoading;
            }

            return {...state, editModel: {...newState}};
        },
        /**
         * 设置应用集合
         *
         * @param state
         * @param action
         * @returns {{apps: (*|Array)}}
         */
        setApps(state, action) {
            return {...state, apps: action.payload.apps};
        }
    },


    subscriptions: {
        setup({history, dispatch}) {
            return history.listen(({pathname}) => {
                dispatch({type: 'queryAllApps'});
            });
        }
    }
};
