import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { inject } from "@angular/core";

import { routes as userRoutes } from './users/users.routes';
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";


export const routes: Routes = [
    {
        path: '', // <your-domain>
        component: NoTaskComponent,
        // redirectTo: '/users/u1',
        // pathMatch: 'prefix',
        title: 'No task selected'
    },
    // {
    //     path: 'tasks', // <your-domain>/tasks
    //     component: TasksComponent
    // },
    {
        path: 'users/:userId', // <your-domain>/users/<uid>
        component: UserTasksComponent,
        children: userRoutes,
        data: {
            message: 'Hello!'
        },
        resolve: {
            userName: resolveUserName
        },
        title: resolveTitle
    },
    {
        path: '**',
        component: NotFoundComponent,
    }
]