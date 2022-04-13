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
        },
        infoTitle : {
            text : 'Chata Travná',
            editable : false
        },
        infoText : {
            text : 'Nějaký pěkný popisek chaty. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam in lorem sit amet leo accumsan lacinia. Duis risus. Etiam neque. Aliquam ornare wisi eu metus. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Vivamus porttitor turpis ac leo. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Fusce suscipit libero eget elit.',
            editable : false
        },
        phone : {
            text : '721 892 661',
            editable : false
        },
        email : {
            text : 'j.svardala@seznam.cz',
            editable : false
        },
        adress : {
            text: 'Lipovská 1170, Jeseník 790 01',
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
            state[id].text = textValue;
            //console.log('saveToDb : ' + id);
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
