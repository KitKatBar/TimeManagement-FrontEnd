import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../models/doctor';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-doctor-display',
  templateUrl: './doctor-display.component.html',
  styleUrls: ['./doctor-display.component.css']
})
export class DoctorDisplayComponent implements OnInit {

  public doctors: Doctor[] = [];
  public doctor: any;
  public errorMsg: any;

  constructor(private dataService: DoctorService, private router: Router) { }

  ngOnInit(): void {
    //this.doctors = this.dataService.doctors;
    this.dataService.getDoctors().subscribe(
      (data) => {this.doctors = data; console.log(data)},
      (err) => this.errorMsg = err,
      () => console.log('Complete')
    )
  }

  editDoctor(doctor: any) {
    //this.router.navigate(['/administration/edit-doctor']);
    this.router.navigate(['/administration/edit-doctor', doctor.id]);
  }

  deleteDoctor(doctor: any) {
    console.log(doctor);
    this.dataService.deleteDoctor(doctor.id).subscribe(() => {
      this.dataService.getDoctors().subscribe(
        (data) => this.doctors = data,
        (err) => this.errorMsg = err,
        () => console.log('Deleted')
      )
    })
  }
}
