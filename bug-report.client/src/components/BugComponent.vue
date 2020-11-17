<template>
  <div class="bugComponent">
    <table class="my-table table table-striped table-dark">
      <thead>
        <tr>
          <th class="custom-header" scope="col">
            Title
          </th>
          <th class="custom-header" scope="col">
            Reported By
          </th>
          <th class="custom-header" scope="col">
            Closed
          </th>
          <th class="custom-header" scope="col">
            Last Modified
          </th>
        </tr>
      </thead>
      <tbody v-if="bugs.length > 0">
        <tr
          v-for="
            (bug,
             index)
              in
                bugs"
          :key="index"
          :style="{ background: bug.closed ? '#E53935' : '#76FF03' }"
        >
          <td class="my-color">
            {{ bug.title }}
          </td>
          <td class="my-color">
            {{ bug.reportedBy }}
          </td>
          <td><i style="color: green" v-if="bug.closed == true" class="fas fa-check"></i> <i style="color: red" v-if="bug.closed == false" class="fas fa-times"></i>  </td>
          <td class="my-color">
            {{ formatDate(bug.updatedAt) + ' / ' }}

            <small style="margin-left: 5px;">{{ getTime(bug.updatedAt) + '  /  ' }}</small>
            <button class="btn btn-outline-dark btn-lg " style="margin-left: 8px;" @click="navigateTo('/bugDetails/' + bug._id)">
              Details
            </button>
          </td>
          <td>
          </td>
        </tr>
      </tbody>
    </table>
    <div style="width: 100%; position: relative;" v-if="bugs.length == 0">
      <loader></loader>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import router from '../router'
import { bugService } from '../services/BugService'
import moment from 'moment'
import { Loader } from './Loader.vue'

export default {
  name: 'BugComponent',
  // eslint-disable-next-line vue/require-prop-types
  props: ['bugProp'],
  setup(props) {
    const state = reactive({
      changedBug: {}
    })
    return {
      state,
      users: computed(() => AppState.user),
      bugs: computed(() => AppState.bugs),
      deleteBug() {
        bugService.deleteBug(props.bugProp._id)
      },
      editBug() {
        bugService.editBug(props.bugProp._id, state.changedBug)
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
      },
      navigateTo(route) {
        router.push(route)
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
