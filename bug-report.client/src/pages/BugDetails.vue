<template>
  <div class="bugDetails container-fluid justify-content-center">
    <h1>Bug Details</h1>
    <div class="row justify-content-center">
      <div class="col-6 align-items-center">
        <div class="card my-card">
          <div class="card-body">
            <form class="form-group" @submit.prevent="createNote">
              <input type="text" class="form-control" v-model="state.newNote.content">
              <button class="btn btn-info mt-3" type="submit">
                Create Note
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12">
        <div class="card mb-5">
          <div class="card-body">
            <button class="btn btn-warning btn-lg" :disabled="bugDetails.closed" @click="markCompleted()">
              Mark Completed
            </button>
            <button class="btn btn-primary btn-lg ml-3" :disabled="bugDetails.closed" @click="toggleIsEditing()">
              Edit Bug
            </button>
          </div>
          <div v-if="bugDetails" class="card-body">
            <h1 v-if="!state.isEditing" class="card-title">
              Title:
              {{ bugDetails.title }}
            </h1>
            <div class="row justify-content-center">
              <input class="my-input mb-2" v-if="state.isEditing" type="text" placeholder="Title" v-model="bugDetails.title" />
            </div>
            <h5 v-if="!state.isEditing" class="card-text desc">
              Description:
              {{ bugDetails.description }}
            </h5>
            <div class="row justify-content-center">
              <input class="my-input mb-2" v-if="state.isEditing" type="text" placeholder="Description" v-model="bugDetails.description" />
            </div>
            <p v-if="!state.isEditing" class="card-text update">
              Last updated at:
              {{ formatDate(bugDetails.updatedAt) }}
            </p>
            <p class="my-name">
              Reported by: {{ bugDetails.reportedBy }}
            </p>
          </div>
          <div class="row justify-content-center">
            <button class="btn btn-outline-light btn-lg" v-if="state.isEditing" @click="updateBug">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <note-component />
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

  .my-card{
    border-style: solid;
    border-color:rgb(1, 253, 148);
    border-width: thick;
  }

  .desc{
    color:rgb(9, 247, 167)
  }

  .update{
    color: rgb(212, 0, 255);
  }

  .my-name{
   color: rgb(243, 7, 7);
  font-size: large;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-weight: bolder;
  text-shadow: rgba(7, 7, 7, 0.719);
  }

  .my-input{
    border-style: solid;
    border-color:rgba(241, 12, 12, 0.719);
    border-width: thick;
  }

</style>
