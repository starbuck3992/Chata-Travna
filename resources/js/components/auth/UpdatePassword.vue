<template>
</template>

<script>
import {reactive} from "vue"
import {useStore} from "vuex"
import Form from "../../utilities/form";

export default {
    setup() {
        const store = useStore();
        const form =
            reactive(new Form({
                current_password: '',
                password: '',
                password_confirmation: '',
            }));

        async function updatePassword() {
            try {
                const response = await store.dispatch('userModule/updatePassword', form.objectToFormData());
                form.onSuccess();
                await store.dispatch('messagesModule/showSuccess', response.data.message);
            } catch (e) {
                if (e.response) {
                    if (e.response.status === 422) {
                        form.onFail(e.response.data.errors);
                    } else {
                        await store.dispatch('messagesModule/showException', e.response.data.message);
                    }
                }
            }
        }

        return {
            form,
            updatePassword
        }
    }
}
</script>
