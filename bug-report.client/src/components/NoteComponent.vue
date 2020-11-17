<template>
  <div class="noteComponent">
    <table class="myTable table table-striped table-dark">
      <thead>
        <tr>
          <th class="custom-header" scope="col">
            ReportedBy
          </th>
          <th class="custom-header" scope="col">
            Content
          </th>
          <th class="custom-header" scope="col">
            Last Modified
          </th>
          <th>
            Closed
          </th>
        </tr>
      </thead>
      <tbody v-if="!state.isLoadingNotes">
        <tr
          v-for="
            (note,
             index)
              in
                notes"
          :key="index"
        >
          <td class="my-color">
            {{ note.reportedBy }}
          </td>
          <td class="my-color">
            {{ note.content }}
          </td>
          <td class="my-color">
            {{ formatDate(note.updatedAt) + ' / ' }}

            <small style="margin-left: 5px;">{{ getTime(note.updatedAt) + '  /  ' }}</small>
            <!-- <button class="btn btn-outline-dark btn-lg " style="margin-left: 8px;" @click="navigateTo('/bugDetails/' + bug._id)">
              Details
            </button> -->
          </td>
          <td>
            <button @click="deleteNote(note._id)" class="btn">
              <i style="color: red" class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div style="width: 100%; position: relative;" v-if="state.isLoadingNotes">
      <loader></loader>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { noteService } from '../services/NoteService'
import { Loader } from './Loader.vue'
import moment from 'moment'
export default {
  name: 'NoteComponent',
  props: ['noteProp'],
  setup(props) {
    const state = reactive({
      changedNote: {
        bugId: props.noteProp,
        isLoadingNotes: false
      }
    })
    const route = useRoute()
    onMounted(async() => {
      state.isLoadingNotes = true
      await noteService.getNotes(route.params.bugId)
      state.isLoadingNotes = false
      // state.changedNote = props.noteProp
      // console.log(state.changedNote)
      // state.changedNote.bugId = route.params.bugId
    })
    return {
      state,
      users: computed(() => AppState.user),
      notes: computed(() => AppState.notes),
      editNote() {
        noteService.editNote(props.noteProp._id, state.changedNote)
      },

      deleteNote(noteId) {
        state.isLoadingNotes = true
        noteService.deleteNote(noteId).then((res) => {
          noteService.getNotes(route.params.bugId)
          state.isLoadingNotes = false
        })
      },

      formatDate(date) {
        if (date) {
          return moment(date).format('MM/DD/YYYY')
        } else {
          return ''
        }
      },
      getTime(date) {
        if (date) {
          return moment(date).format('hh:mm A')
        } else {
          return ''
        }
      }
    }
  },
  components: {
    Loader
  }
}
</script>

<style lang="scss" scoped>

button{
  border-style: solid;
  border-color:rgba(10, 10, 10, 0.973);
  border-width: thick;
  padding: none;
}

.my-color{
  color: rgb(0, 0, 0);
  font-size: x-large;
  font-family: fantasy;
  font-weight: bolder;
}

.custom-header{
  color: rgb(5, 253, 5);
  font-size: xx-large;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bolder;
}

</style>
