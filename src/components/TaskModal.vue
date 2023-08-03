<template>
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" @click="openModal">
  Launch demo modal
</button>

<!-- Modal -->
<div v-if="isVisible.open">
    <div class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                </div>
            <div class="modal-body">modal</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
    </div>

</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
    name: 'TaskModal',
    setup() {

        const isVisible = reactive({
            open: false
        });

        const openModal = () => {
            console.log(isVisible.open)
            isVisible.open = true;
        }

        return { isVisible, openModal }
    }
})
</script>