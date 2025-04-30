import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { inject } from "@angular/core";

import { routes as userRoutes } from './users/users.routes';
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const dummyCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router);
    const shouldGetAccess = Math.random();
    if (shouldGetAccess < 0.5) {
        return true;
    }
    return new RedirectCommand(router.parseUrl('/unauthorized'));
    // return false;    // would break the application
}

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
        canMatch: [dummyCanMatch],
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