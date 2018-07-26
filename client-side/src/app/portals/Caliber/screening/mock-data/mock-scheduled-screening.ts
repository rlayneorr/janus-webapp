import { ScheduledScreening } from '../entities/scheduleScreening';
import { CANDIDATES } from '../mock-data/mock-candidates';
import { SKILLTYPES } from '../mock-data/mock-skillTypes';

export const SCHEDULEDSCREENINGS: ScheduledScreening[] = [
{
  scheduledScreeningId: 1,
  candidate: CANDIDATES[0],
  track: SKILLTYPES[0],
  status: 'Scheduled',
  trainer: 1,
  scheduledDate: new Date(2018, 7, 25, 9)
},
{
    scheduledScreeningId: 1,
    candidate: CANDIDATES[1],
    track: SKILLTYPES[1],
    status: 'Scheduled',
    trainer: 1,
    scheduledDate: new Date(2018, 7, 25, 9)
  },{
    scheduledScreeningId: 1,
    candidate: CANDIDATES[2],
    track: SKILLTYPES[2],
    status: 'Scheduled',
    trainer: 1,
    scheduledDate: new Date(2018, 7, 25, 9)
  },{
    scheduledScreeningId: 1,
    candidate: CANDIDATES[0],
    track: SKILLTYPES[0],
    status: 'Scheduled',
    trainer: 1,
    scheduledDate: new Date(2018, 7, 25, 9)
  },{
    scheduledScreeningId: 1,
    candidate: CANDIDATES[3],
    track: SKILLTYPES[3],
    status: 'Scheduled',
    trainer: 1,
    scheduledDate: new Date(2018, 7, 25, 9)
  },{
    scheduledScreeningId: 1,
    candidate: CANDIDATES[4],
    track: SKILLTYPES[4],
    status: 'Scheduled',
    trainer: 1,
    scheduledDate: new Date(2018, 7, 25, 9)
  },{
    scheduledScreeningId: 1,
    candidate: CANDIDATES[5],
    track: SKILLTYPES[5],
    status: 'Scheduled',
    trainer: 1,
    scheduledDate: new Date(2018, 7, 25, 9)
  },{
    scheduledScreeningId: 1,
    candidate: CANDIDATES[6],
    track: SKILLTYPES[6],
    status: 'Scheduled',
    trainer: 1,
    scheduledDate: new Date(2018, 7, 25, 9)
  },{
    scheduledScreeningId: 1,
    candidate: CANDIDATES[7],
    track: SKILLTYPES[0],
    status: 'Scheduled',
    trainer: 1,
    scheduledDate: new Date(2018, 7, 25, 9)
  },{
    scheduledScreeningId: 1,
    candidate: CANDIDATES[8],
    track: SKILLTYPES[1],
    status: 'Scheduled',
    trainer: 1,
    scheduledDate: new Date(2018, 7, 25, 9)
  },{
    scheduledScreeningId: 1,
    candidate: CANDIDATES[9],
    track: SKILLTYPES[2],
    status: 'Scheduled',
    trainer: 1,
    scheduledDate: new Date(2018, 7, 25, 9)
  },{
    scheduledScreeningId: 1,
    candidate: CANDIDATES[10],
    track: SKILLTYPES[3],
    status: 'Scheduled',
    trainer: 1,
    scheduledDate: new Date(2018, 7, 25, 9)
  },{
    scheduledScreeningId: 1,
    candidate: CANDIDATES[11],
    track: SKILLTYPES[4],
    status: 'Scheduled',
    trainer: 1,
    scheduledDate: new Date(2018, 7, 25, 9)
  },
]