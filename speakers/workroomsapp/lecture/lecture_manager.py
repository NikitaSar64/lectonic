from django.core import exceptions
from django.db import models, transaction
from django.utils.timezone import make_aware

from workroomsapp import models as workrooms_models


class LectureManager(models.Manager):
    @transaction.atomic
    def create_as_lecturer(self, name: str, photo: object = None,
                           lecturer: object = None, datetime: list = None,
                           hall_address: str = None, equipment: str = None,
                           lecture_type: str = None, status: bool = None,
                           cost: int = 0,
                           description: str = "", domain: list = None):

        if not lecturer:
            raise exceptions.ValidationError(
                'В объектный менеджер не передан объект лектора')
        if not lecture_type:
            raise exceptions.ValidationError('В менеджер не передан тип лекции')

        optional = workrooms_models.Optional.objects.create(
            hall_address=hall_address,
            equipment=equipment
        )

        lecture = self.create(
            name=name,
            optional=optional,
            type=lecture_type,
            status=status,
            cost=cost,
            description=description
        )

        if domain is not None:
            for name in domain:
                workrooms_models.LectureDomain.objects.create(
                    lecture=lecture,
                    domain=workrooms_models.Domain.objects.get(name=name)
                )

        lecture_request = workrooms_models.LectureRequest.objects.create(lecture=lecture)

        calendar = lecturer.lecturer_calendar.calendar
        for event in datetime:
            calendar.events.add(workrooms_models.Event.objects.create(
                datetime_start=make_aware(event[0]),
                datetime_end=make_aware(event[1]),
                lecture_request=lecture_request))

        calendar.save()

        return workrooms_models.LecturerLectureRequest.objects.create(
            lecturer=lecturer,
            lecture_request=lecture_request,
            photo=photo
        )

    @transaction.atomic
    def create_as_customer(self, name: str, photo: object = None,
                           customer: object = None, datetime: list = None,
                           hall_address: str = None, equipment: str = None,
                           lecture_type: str = None, status: bool = None,
                           listeners: int = None, cost: int = 0,
                           description: str = "", domain: list = None):

        if not customer:
            raise exceptions.ValidationError(
                'В объектный менеджер не передан объект лектора')
        if not lecture_type:
            raise exceptions.ValidationError('В менеджер не передан тип лекции')

        optional = workrooms_models.Optional.objects.create(
            hall_address=hall_address,
            equipment=equipment
        )

        lecture = self.create(
            name=name,
            optional=optional,
            type=lecture_type,
            status=status,
            cost=cost,
            description=description
        )

        if domain is not None:
            for name in domain:
                workrooms_models.LectureDomain.objects.create(
                    lecture=lecture,
                    domain=workrooms_models.Domain.objects.get(name=name)
                )

        lecture_request = workrooms_models.LectureRequest.objects.create(lecture=lecture)

        calendar = customer.customer_calendar.calendar
        for event in datetime:
            calendar.events.add(workrooms_models.Event.objects.create(
                datetime_start=make_aware(event[0]),
                datetime_end=make_aware(event[1]),
                lecture_request=lecture_request))

        calendar.save()

        return workrooms_models.CustomerLectureRequest.objects.create(
            customer=customer,
            lecture_request=lecture_request,
            photo=photo,
            listeners=listeners
        )
