<template>
  <div class="bugDetails container-fluid justify-content-center">
    <h1>Bug Details</h1>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <button :disabled="bugDetails.closed" @click="markCompleted()">
            Mark Completed
          </button>
          <button :disabled="bugDetails.closed" @click="toggleIsEditing()">
            Edit
          </button>
          <div v-if="bugDetails" class="card-body">
            <h1 v-if="!state.isEditing" class="card-title">
              Title:
              {{ bugDetails.title }}
            </h1>
            <input v-if="state.isEditing" type="text" v-model="bugDetails.title" />
            <p v-if="!state.isEditing" class="card-text">
              Description
              {{ bugDetails.description }}
            </p>
            <input v-if="state.isEditing" type="text" v-model="bugDetails.description" />
            <p v-if="!state.isEditing" class="card-text">
              Last updated at:
              {{ formatDate(bugDetails.updatedAt) }}
            </p>
            <p>{{ bugDetails.reportedBy }}</p>
          </div>
          <button v-if="state.isEditing" @click="updateBug">
            Save
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <form class="col-3 form-group" @submit.prevent="createNote">
        <input type="text" class="form-control" v-model="state.newNote.content">
        <button class="btn btn-info" type="submit">
          Create Note
        </button>
      </form>
      <note-component />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { noteService } from '../services/NoteService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import NoteComponent from '../components/NoteComponent'
import { bugService } from '../services/BugService'
import moment from 'moment'

export default {
  name: 'BugDetails',
  setup(props) {
    const route = useRoute()
    const state = reactive({
      newNote: {
        content: '',
        reportedBy: '',
        bugId: route.params.bugId
      },
      isEditing: false
    })
    onMounted(async() => {
      console.log(route.params)
      await bugService.getBugDetails(route.params.bugId)
    })
    return {
      state,
      bugDetails: computed(() => AppState.bugDetails),
      notes: computed(() => AppState.notes),
      createNote() {
        state.newNote.bugId = route.params.bugId
        state.newNote.reportedBy = AppState.user.nickname
        noteService.createNote(state.newNote)
      },
      markCompleted() {
        bugService.editBug(route.params.bugId, { closed: true }).then((res) => {
          bugService.getBugDetails(route.params.bugId)
        })
      },
      toggleIsEditing() {
        console.log(state)
        state.isEditing = !state.isEditing
      },
      updateBug() {
        state.isEditing = false
        bugService.editBug(route.params.bugId, this.bugDetails).then((res) => {
          bugService.getBugDetails(route.params.bugId)
        })
      },
      formatDate(date) {
        if (date) {
          return moment(date).format('MM/DD/YYYY')
        } else {
          return ''
        }
      }
    }
  },
  components: { NoteComponent }
}
</script>

<style lang="scss" scoped>

div{
    text-align: center;
  user-select: none;
  background-color: black;
  background-repeat: no-repeat;
  background-size: cover;
  color: rgb(177, 240, 4);
  text-shadow: 2px 2px 8px rgba(7, 7, 7, 0.719);
}

button{
    border-style: solid;
    border-color: rgb(25, 253, 4);
    border-width: thick;
  }

  .card{
    border-style: solid;
    border-color:beige;
    border-width: thick;
  }

</style>
