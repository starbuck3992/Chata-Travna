const editableModule = {
    namespaced: true,
    state: {
        subTitle : {
            text : 'Nějaký menší popisek',
            editable : false
        },
        alertTitle : {
            text : 'Upozornění!',
            editable : false
        },
        alertText : {
            text : 'Kdyby se cokoli stalo, nebo nějaká důležitá informace pro uživatele. Mohlo by se zobrazovat toto okýnkdo, kde bude možné napsat cokoli. Pokud bude vše v pořádku vůbec tady to okénko viditelné být nemusí.',
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
            console.log('changeEditable : ' + id);
        },
        saveToDb(state, id) {
            let textValue = document.getElementById(id).innerHTML;
            console.log(textValue);
            state[id].editable = false;
            console.log('saveToDb : ' + id);
        },
        discardChanges(state, id) {
            state[id].editable = false;
            document.getElementById(id).innerHTML = state[id].text;
        },
       
    },
    actions: {
        changeEditable({commit}, payload) {
           commit('changeEditable', payload);
        },
        saveToDb({commit}, payload) {
            commit('saveToDb', payload);
        },
        discardChanges({commit}, payload) {
            commit('discardChanges', payload);
        },

    }
}

export default editableModule;
