import Api from "../../services/api";
import {useStore} from "vuex";
const store = useStore();
const editableModule = {
    namespaced: true,
    state: {
        subTitle : {
            text : '',
            editable : false
        },
        alertTitle : {
            text : '',
            editable : false
        },
        alertText : {
            text : '',
            editable : false
        },
        infoTitle : {
            text : '',
            editable : false
        },
        infoText : {
            text : '',
            editable : false
        },
        phone : {
            text : '',
            editable : false
        },
        email : {
            text : '',
            editable : false
        },
        adress : {
            text: '',
            editable : false
        }
    },
    getters: {
        content(state) {
            return state;
        },
    },
    mutations: {
        changeEditable(state, id) {
            state[id].editable = true;
        },
        saveToDb(state, data) {
            state[data.name].editable = false;
            state[data.name].text = data.text;
        },
        discardChanges(state, id) {
            state[id].editable = false;
            document.getElementById(id).innerText = state[id].text;
        },
        saveData(state, data) {
            data.forEach(element => {
                state[element.name].text = element.value;
            });
        }
       
    },
    actions: {
        changeEditable({commit}, payload) {
           commit('changeEditable', payload);
        },
        saveToDb({commit}, id) {
            //Set variables
            let textValue = document.getElementById(id).innerText;
            let data = {
                "name" : id,
                "text" : textValue
            }

            //Save to database on BE
            Api.post('/api/admin/edits', data).then((response) => {
                store.dispatch('messagesModule/showSuccess', response.data.message);
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status === 422) {
                        form.onFail(error.response.data.errors);
                    } else {
                        store.dispatch('messagesModule/showException', error.response.data.message);
                    }
                } else {
                    console.log(error);
                }
            })

            //Save to database on FE (STATE)
            commit('saveToDb', data);
        },
        discardChanges({commit}, payload) {
            commit('discardChanges', payload);
        },
        getDataFromDatabase({commit}, payload) {
            commit('saveData',payload);
        },

    }
}

export default editableModule;
