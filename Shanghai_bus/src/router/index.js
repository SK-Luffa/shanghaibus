import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Index from "@/components/Index";
import Sites from "@/components/views/Sites.vue";
import User from "@/components/views/User.vue";
import UserRright from "@/components/views/UserRright.vue";
import Task from "@/components/views/Task.vue";
import TasksSearch from "@/components/views/TasksSearch.vue";
import Position from "@/components/views/Position.vue";
import Breakdown from "@/components/views/Breakdown.vue";
import Handle from "@/components/views/Handle.vue";
import Checklist from "@/components/views/Checklist.vue";
import TaskType from "@/components/views/TaskType.vue";
import TaskStatus from "@/components/views/TaskStatus.vue";
import FailureSite from "@/components/views/FailureSite.vue";
import CreatTasks from "@/components/views/CreatTasks.vue";
import Maps from "@/components/views/Maps.vue"; //DownExcel
import DownExcel from "@/components/views/DownExcel.vue"; //
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },

    {
      path: "/Index",
      component: Index,
      children: [
        {
          path: "/",
          redirect: "Sites"
        },
        {
          path: "Sites",
          name: "Sites",
          component: Sites
        },
        {
          path: "User",
          name: "User",
          component: User
        },
        {
          path: "UserRright",
          name: "UserRright",
          component: UserRright
        },
        {
          path: "Task",
          name: "Task",
          component: Task
        },
        {
          path: "TasksSearch",
          name: "TasksSearch",
          component: TasksSearch
        },
        {
          path: "Position",
          name: "Position",
          component: Position
        },
        {
          path: "Breakdown",
          name: "Breakdown",
          component: Breakdown
        },
        {
          path: "Handle",
          name: "Handle",
          component: Handle
        },
        {
          path: "Checklist",
          name: "Checklist",
          component: Checklist
        },
        {
          path: "TaskType",
          name: "TaskType",
          component: TaskType
        },
        {
          path: "TaskStatus",
          name: "TaskStatus",
          component: TaskStatus
        },
        {
          path: "FailureSite",
          name: "FailureSite",
          component: FailureSite
        },
        {
          path: "CreatTasks",
          name: "CreatTasks",
          component: CreatTasks
        },
        {
          path: "DownExcel",
          name: "DownExcel",
          component: DownExcel
        },
        {
          path: "Maps",
          name: "Maps",
          component: Maps
        }
      ]
    }
  ]
});
