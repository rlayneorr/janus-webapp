import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ScheduleModule, Schedule, } from 'primeng/primeng';
import { CalendarModule, Calendar } from 'primeng/primeng';
import { Subtopic } from '../../../models/subtopic.model';
import { CalendarEvent } from '../../../models/calendar-event.model';
import { CalendarService } from '../../../services/calendar.service';
import { CalendarStatusService } from '../../../services/calendar-status.service';
import { AddSubtopicService } from '../../../services/add-subtopic.service';
import { SubtopicService } from '../../../services/subtopic.service';
import { Batch } from '../../../models/batch.model';
import { SessionService } from '../../../services/session.service';

/**
    *	This component will serve as the main calendar view.
    * This component leverages the PrimeNG schedule UI component to render a drag and drop calendar for
    * viewing and updating a batch's subtopics
*	@author Francisco Palomino, Jordan DeLong, Sean Sung (1712-dec10-java-Steve)
*
*
*/

declare var $: any;
const DRAG_REVERT_DURATION = 300;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
  @ViewChild('fc') fc: Schedule;
  @ViewChild('datePicker') datePicker: Calendar;
  @ViewChild('tooltip') tooltip: ElementRef;
  @ViewChild('body') body: ElementRef;
  @ViewChild('status') status: ElementRef;

  events: CalendarEvent[] = [];
  gotoDateValue: Date = new Date(Date.now());
  overridenDate: Date;
  draggedCalendarEvent: CalendarEvent;
  // reference to subtopic being added that already exists
  existingSubtopic: Subtopic;
  selectedBatch: Batch;

  /* Tooltip data bindings */
  subtopicTooltip: string;
  statusTooltip: string;
  timeTooltip: string;


  trashOpacity: number;

  constructor(private calendarService: CalendarService, private statusService: CalendarStatusService,
    private addSubtopicService: AddSubtopicService, private subtopicService: SubtopicService,
    private sessionService: SessionService) { }

  ngOnInit() {
    this.selectedBatch = this.sessionService.getSelectedBatch();
    this.calendarService.getSubtopicsByBatchPagination(this.selectedBatch.id, 0, 300).subscribe(
      subtopics => {
        for (const subtopic of subtopics) {
          const calendarEvent = this.calendarService.mapSubtopicToEvent(subtopic);
          this.events.push(calendarEvent);
        }
        this.overridenDate = this.events[0].start;
      }
    );

    // event handler for newly added topics
    this.calendarService.addCalendarEvent
      .subscribe(calendarEvent => {
        this.addEvent(calendarEvent);
      });

    if (window.innerWidth < 1000) {
      this.fc.defaultView = 'listMonth';
      this.fc.header = {
        left: 'agendaDay,agendaWeek,listMonth',
        center: 'title',
        right: 'today prev,next'
      };
    } else {
      this.fc.defaultView = 'month';
      this.fc.header = {
        left: 'agendaDay,agendaWeek,month listMonth',
        center: 'title',
        right: 'today prev,next'
      };
    }
    this.fc.allDaySlot = false;
    this.fc.eventDurationEditable = false;
    this.fc.options = {
      defaultDate: this.selectedBatch.startDate,
      nowIndicator: true,
      navLinks: true,
      weekNumbers: true,
      weekends: true,
      droppable: true,
      eventLimit: 5,
      longPressDelay: 100,
      dragRevertDuration: 0,
      scrollTime: '09:00:00',
      zIndex: -1,
      businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        dow: [1, 2, 3, 4, 5], // Monday - Friday

        start: '9:00', // a start time (9am)
        end: '17:00', // an end time (5pm)
      },
      minTime: '08:00:00',
      maxTime: '18:00:00',
      defaultTimedEventDuration: '01:00:00',
      forceEventDuration: false
    };

    $('.fc-trash').droppable(
      {
        accept: '*',
        scope: 'fc-deletable',

        drop: (event, ui) => this.trashDropEvent(event, ui, this.draggedCalendarEvent),

        over: function (event, ui) {
          event.target.style.opacity = 0.5;
        },

        out: function (event, ui) {
          event.target.style.opacity = 1;
        }
      });
  }

  /*Date Picker Event*/
  jumpToDate(date) {
    this.fc.gotoDate(date);
    this.fc.changeView('agendaDay');
  }

  /**
   * Changes the status as well as the color of the calendar event based on current date and date of the event
   * @param event
   * @author Sean Sung (1712-dec10-java-Steve)
   */
  handleEventClick(event) {
    const clickedTopic = event.calEvent;
    const calendarEvent = this.mapSubtopicFromEvent(clickedTopic);

    clickedTopic.status = this.statusService.updateNextStatus(calendarEvent);
    clickedTopic.color = this.statusService.getStatusColor(calendarEvent.status);
    calendarEvent.color = clickedTopic.color;

    this.calendarService.updateTopicStatus(calendarEvent, this.selectedBatch.id).subscribe();
    this.updateEvent(calendarEvent);
    this.fc.updateEvent(event.calEvent);

  }

  /**
   * Resets drag duration to original value and tracks currently dragged target
   * @param event
   */
  handleEventDragStart(calendar) {
    this.draggedCalendarEvent = this.mapSubtopicFromEvent(calendar.event);
  }

  /**
   * Updates date and status based on new date.
   * Also updates reference that we keep
   * @param calendar
   */
  handleEventDrop(calendar) {
    const droppedTopic = calendar.event;
    const calendarEvent = this.mapSubtopicFromEvent(droppedTopic);
    const milliDate = calendarEvent.start.getTime();

    droppedTopic.status = this.statusService.updateMovedStatus(calendarEvent);
    droppedTopic.color = this.statusService.getStatusColor(droppedTopic.status);
    calendarEvent.color = droppedTopic.color;

    // update date and status synchronously
    this.calendarService.changeTopicDate(droppedTopic.subtopicId, this.selectedBatch.id, milliDate)
      .subscribe(
      response => {
        this.calendarService.updateTopicStatus(calendarEvent, this.selectedBatch.id).subscribe();
      },
      error => {
        this.calendarService.updateTopicStatus(calendarEvent, this.selectedBatch.id).subscribe();
      }
      );
    this.updateEvent(calendarEvent);
    this.fc.updateEvent(droppedTopic);
  }

  /**
  * This function handles new external subtopics being dropped onto the calendar.
  * The event.jsEvent.target has data attached to it under the key "subtopic" and comes in as a Subtopic object
  * Check if the subtopic already exists on the calendar before adding.
  * @param event
  */
  handleDrop(event) {
    const newSubtopic = $(event.jsEvent.target).data('subtopic');
    // time not needed for non-month views
    if (event.resourceId.name !== 'month') {
      newSubtopic.subtopicDate = new Date(event.date.format());
    } else {
      newSubtopic.subtopicDate = new Date(event.date.format() + 'T09:00:00-05:00');
    }
    const calendarEvent = this.calendarService.mapSubtopicToEvent(newSubtopic);
    let existingIndex;

    if ((existingIndex = this.eventExists(calendarEvent)) > -1) {
      this.existingSubtopic = newSubtopic;
      this.existingSubtopic.subtopicId = this.events[existingIndex].subtopicId;
      $('#add-existing-subtopic-modal').modal('show');
      return;
    }

    const index = this.addEvent(calendarEvent);
    this.addSubtopicService.addSubtopic(newSubtopic)
      .subscribe(subtopic => {
        this.addEvent(this.calendarService.mapSubtopicToEvent(subtopic));
      });
  }

  /**
   * Unhides the tooltip and positions it above the element.
   * This function also attaches jqueryUI draggable class to allow the event object to interact with
   * external components such as the trashcan.
   *
   * @param event
   * @author Sean Sung, Francisco Palomino (1712-dec10-java-Steve)
   */
  handleEventMouseover(event) {
    if (event.view.name === 'month') {
      $(event.jsEvent.currentTarget).draggable(
        {
          scope: 'fc-deletable',
          revert: true,
          revertDuration: DRAG_REVERT_DURATION,
          zIndex: 1
        }
      );
    }
    this.subtopicTooltip = event.calEvent.title;
    this.statusTooltip = event.calEvent.status;
    this.timeTooltip = event.calEvent.start.format('h:mm a');
    // calculate y point of tooltip to be below mouse
    let y = event.jsEvent.target.getBoundingClientRect().top;
    const offsetY = this.body.nativeElement.getBoundingClientRect().top;
    y = y - offsetY + 120;

    this.status.nativeElement.style.background = this.statusService.getStatusColor(this.statusTooltip);
    this.tooltip.nativeElement.style.display = 'inline';
    this.tooltip.nativeElement.style.top = y + 'px';
    this.tooltip.nativeElement.style.left = event.jsEvent.clientX + 'px';
    this.tooltip.nativeElement.style.pointerEvents = 'none';
  }

  /* Hides tooltip on mouse out */
  handleEventMouseout(event) {
    this.tooltip.nativeElement.style.display = 'none';
  }


  /**
   * Convert values stored in the event variable back to a CalendarEvent object
   * @param event
   * @author Sean Sung
   */
  mapSubtopicFromEvent(event): CalendarEvent {
    const calendarEvent = new CalendarEvent();
    calendarEvent.subtopicNameId = event.subtopicNameId;
    calendarEvent.subtopicId = event.subtopicId;
    calendarEvent.title = event.title;
    calendarEvent.color = event.color;
    calendarEvent.status = event.status;
    // convert from moment to date
    calendarEvent.start = new Date(event.start.format());

    return calendarEvent;
  }

  /**
   * Updates the event array object to match the calendar view.
   * This is called on internal drop events
   * @param changedSubtopic
   */
  updateEvent(changedSubtopic: CalendarEvent) {
    const index = this.eventExists(changedSubtopic);
    if (index === 0) {
      this.overridenDate = changedSubtopic.start;
    }
    // reset the first index date that gets overriden on drops
    this.events[0].start = this.overridenDate;

    this.events[index].start = changedSubtopic.start;
    this.events[index].status = changedSubtopic.status;
    this.events[index].color = changedSubtopic.color;
  }

  /**
   * Removes event if it already exists and then inserts new event to this.events
   * Returns index where event was added
   * @param calendarEvent
   */
  addEvent(calendarEvent: CalendarEvent): number {
    let index = this.eventExists(calendarEvent);

    if (index > -1) {
      this.events.splice(index, 1, calendarEvent);
    } else {
      this.events.push(calendarEvent);
      index = this.events.length - 1;
    }
    return index;
  }

  /**
   * Removes event at given index,
   * If index is 0, then overridenDate must be updated to the next index
   * to keep a reference to the date when calendar overwrites it
   * @param index
   */
  removeEvent(index: number) {
    if (index === 0) {
      this.overridenDate = this.events[1].start;
    }
    this.events.splice(index, 1);
  }

  /**
   * check if event exists in the array and returns the index if it does or -1 if it doesn't
   * @param calendarEvent
   */
  eventExists(calendarEvent: CalendarEvent): number {
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].subtopicNameId === calendarEvent.subtopicNameId) {
        return i;
      }
    }
    return -1;
  }

  /**
 * Callback function to handle drop events that land on the trash icon
 *
 * @param event
 * @param ui
 * @param calendarEvent
 */
  trashDropEvent(event, ui, calendarEvent: CalendarEvent) {
    event.target.style.opacity = 1;
    this.removeEvent(this.eventExists(calendarEvent));
    this.subtopicService.removeSubtopicFromBatch(calendarEvent.subtopicId).subscribe();
  }

  /**
   * Event handler for adding existing subtopics when a user clicks yes in modal popup.
   * Simply updates the date.
   * @param subtopic
   */
  handleAddExistingSubtopic(subtopic: Subtopic) {
    const index = this.addEvent(this.calendarService.mapSubtopicToEvent(subtopic));
    this.calendarService.changeTopicDate(subtopic.subtopicId, this.selectedBatch.id, subtopic.subtopicDate.getTime())
      .subscribe();
  }

  handleViewRender($event) {

    this.gotoDateValue = new Date(this.fc.getDate().stripTime().format() + 'T09:00:00-05:00');

  }


}
