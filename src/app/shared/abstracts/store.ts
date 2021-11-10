import { BehaviorSubject, Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';


export abstract class Store<T = any> {
  private readonly _dataSource: BehaviorSubject<T>;
  private readonly _isLoadedSource = new BehaviorSubject<boolean>(false);
  readonly data$: Observable<T>;
  readonly isLoaded$ = this._isLoadedSource.asObservable();
  get snapshot() {
    return this._dataSource.getValue();
  }
  constructor(initialData?: T) {
    this._dataSource = new BehaviorSubject(initialData);
    this.data$ = this._dataSource.asObservable().pipe(
      skipWhile(data => !data)
    );
  }
  abstract fetchData(): any; // Promise<void>;

  setData(data: T) {
    this._dataSource.next(data);
  }
  setIsLoaded(bool: boolean) {
    this._isLoadedSource.next(bool);
  }


}
