import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  userId = input.required<string>();
  // order = input<'asc' | 'desc'>();
  order = signal<'asc' | 'desc'>('desc');

  private tasksService = inject(TasksService);
  userTasks = computed(() => this.tasksService.allTasks().filter(task => task.userId === this.userId()));
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    const subscription = this.activatedRoute.queryParams.subscribe({
      next: (params) => this.order.set(params['order'])
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
