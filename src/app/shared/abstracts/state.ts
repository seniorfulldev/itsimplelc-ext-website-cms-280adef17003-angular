import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class State<T = any> {
  private dataSrc: BehaviorSubject<T>;
  data$: Observable<T>;
  constructor(initialData: T) {
    this.dataSrc = new BehaviorSubject(initialData);
    this.data$ = this.dataSrc.asObservable();
  }
  get snapshot() {
    return this.dataSrc.getValue();
  }
  protected select<K extends keyof T>(path: K): Observable<T[K]> {
    return this.data$.pipe(
      map((state) => state[path])
      // some additional logic
    );
  }
  protected patch(data: Partial<T>) {
    this.dataSrc.next({ ...this.snapshot, ...data });
  }
}
