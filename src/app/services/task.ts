import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Task {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private firestore = inject(Firestore);
  private tasksCollection = collection(this.firestore, 'tasks');

  // Obtener tareas del usuario
  getTasks(userId: string): Observable<Task[]> {
    const q = query(this.tasksCollection, where('userId', '==', userId));
    return collectionData(q, { idField: 'id' }) as Observable<Task[]>;
  }

  // Crear tarea
  addTask(task: Omit<Task, 'id'>) {
    return addDoc(this.tasksCollection, task);
  }

  // Actualizar tarea
  updateTask(id: string, data: Partial<Task>) {
    const taskDoc = doc(this.firestore, 'tasks', id);
    return updateDoc(taskDoc, data);
  }

  // Eliminar tarea
  deleteTask(id: string) {
    const taskDoc = doc(this.firestore, 'tasks', id);
    return deleteDoc(taskDoc);
  }
}