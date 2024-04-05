import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonService } from '../person/person.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { FilterNotificationDto } from './dto/filter-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationRepository)
    private readonly notificationRepository: NotificationRepository,
    private personService: PersonService,
  ) {}
  async create(createNotificationDto: CreateNotificationDto) {
    const newNotification = this.notificationRepository.create(
      createNotificationDto,
    );
    if (createNotificationDto.person_id) {
      const person = await this.personService.findOne(
        +createNotificationDto.person_id,
      );
      newNotification.person = person;
    }
    return this.notificationRepository.save(newNotification);
  }

  findAll(params?: FilterNotificationDto) {
    if (params) {
      const { limit, offset } = params;
      return this.notificationRepository.find({
        relations: ['person'],
        take: limit,
        skip: offset,
      });
    }
    return this.notificationRepository.find({ relations: ['person'] });
  }

  findOne(id: number) {
    const notification = this.notificationRepository.findOne({
      relations: ['person'],
    });
    if (!notification) throw new NotFoundException(`Phone #${id} not found`);
    return notification;
  }

  async update(id: number, changes: UpdateNotificationDto) {
    const notification = await this.notificationRepository.findOne(id);
    this.notificationRepository.merge(notification, changes);
    return this.notificationRepository.save(notification);
  }

  async remove(id: number) {
    const object = await this.notificationRepository.findOne(id);
    object.is_deleted = true;
    return this.notificationRepository.save(object);
  }
}
