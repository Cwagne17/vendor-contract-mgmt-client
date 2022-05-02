import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { WORK_TYPE_ROUTES } from 'src/environments/routes';
import { CreateWorkTypeDto, SearchWorkTypesDto, WorkType, UpdateWorkTypeDto } from '../types/work-type';
import { AuthService } from './auth.service';
import { IWorkTypeService } from './interfaces/iwork-type.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class WorkTypeService implements IWorkTypeService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snackbarService: SnackbarService
  ) {}
  
  createWorkType(createWorkTypeDto: CreateWorkTypeDto): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth.initHeaders();
      this.http
        .post(
          WORK_TYPE_ROUTES.CREATE_WORK_TYPE(),
          createWorkTypeDto,
          { headers: this.auth.headers }
        )
        .pipe(retry(3))
        .toPromise()
        .then((res: any) => {
          resolve(res);
        },
        (error) => {
          this.snackbarService.sendNotificationByError(error);
          reject(error);
        });
    });
  }

  searchWorkType(query: SearchWorkTypesDto): Promise<WorkType[]> {
    return new Promise((resolve, reject) => {
      this.auth.initHeaders();
      this.http
        .get(
          WORK_TYPE_ROUTES.SEARCH_WORK_TYPE(query),
          { headers: this.auth.headers }
        )
        .pipe(retry(3))
        .toPromise()
        .then((res: any) => {
          resolve(res);
        },
        (error) => {
          this.snackbarService.sendNotificationByError(error);
          reject(error);
        });
    });
  }

  updateWorkType(id: string, updateWorkTypeDto: UpdateWorkTypeDto): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth.initHeaders();
      this.http
        .patch(
          WORK_TYPE_ROUTES.UPDATE_WORK_TYPE(id),
          updateWorkTypeDto,
          { headers: this.auth.headers }
        )
        .pipe(retry(3))
        .toPromise()
        .then((res: any) => {
          resolve(res);
        },
        (error) => {
          this.snackbarService.sendNotificationByError(error);
          reject(error);
        });
    });
  }

  deleteWorkType(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth.initHeaders();
      this.http
        .delete(
          WORK_TYPE_ROUTES.DELETE_WORK_TYPE(id),
          { headers: this.auth.headers }
        )
        .pipe(retry(3))
        .toPromise()
        .then((res: any) => {
          resolve(res);
        },
        (error) => {
          this.snackbarService.sendNotificationByError(error);
          reject(error);
        });
    });
  }
}
