<template>
  <div class="home container-fluid">
    <div class="row justify-content-center mt-3 mb-3">
      <h1>BUG REPORT</h1>
    </div>
    <div class="col-12 ml-1 mr-6">
      <bug-component />
    </div>
    <div class="row justify-content-center">
      <div class="col-6">
        <!-- <form class="form group mt-4" @submit.prevent="createBug"> -->
        <div class="card">
          <div class="card-body">
            <div class="row justify-content-center">
              <div class="form-group mx-sm-3 mb-2">
                <input style="margin-bottom: 1em;" type="text" class="form-control" v-model="state.newBug.title" placeholder="Title">
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="form-group mx-sm-3 mb-4">
                <textarea style="height: 100px;" type="text" class="form-control" v-model="state.newBug.description" placeholder="Description"></textarea>
              </div>
            </div>
            <div class="row justify-content-center">
              <button @click="createBug()" class="btn btn-primary mb-2">
                Report Bug
              </button>
            </div>
          </div>
        </div>
        <!-- </form> -->
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed } from 'vue'
import BugComponent from '../components/BugComponent'
import { bugService } from '../services/BugService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    onMounted(() => {

    })
    const state = reactive({
      newBug: {
        title: '',
        description: '',
        closed: false
      }
    })
    return {
      state,
      user: computed(() => AppState.user),
      createBug() {
        if (state.newBug.title.length > 0 && state.newBug.description.length > 0) {
          // console.log(AppState.user.nickname)
          state.newBug.reportedBy = AppState.user.name
          bugService.createBug(state.newBug)
        }
      },
      users: computed(() => AppState.users),
      bugs: computed(() => AppState.bugs)
    }
  },
  components: { BugComponent }
}
</script>

<style scoped lang="scss">
button{
    border-style: solid;
    border-color: rgba(43, 255, 0, 0.89);
    border-width: thick;
  }

.home{
  user-select: none;
  background-color: black;
  background-repeat: no-repeat;
  background-size: cover;
  color: rgb(179, 253, 5);
  text-shadow: 2px 2px 8px rgba(10, 10, 10, 0.719);
  text-align: center;
  user-select: none;
  min-height: 180vh;
  > img{
    height: 200px;
    width: 200px;
  }
}

.custom-card{
  height: 50vh !important;
  width: 50vh;
}

.card{
  border-color: aquamarine;
  border-style: solid;
  border-width: thick;
  background-color: rgba(0, 0, 0, 0.651);
}

</style>
