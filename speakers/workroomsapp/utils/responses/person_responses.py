from speakers.utils import response

CREATED = 'Профиль пользователя успешно создан'
PATCHED = 'Профиль пользователя успешно изменен'
DONT_EXIST = 'Данного профиля не существует'
IS_EXIST = 'Профиль для текущего пользователя уже существует'

DESCRIPTION = '\n\nВсе возможные статусы ответов:\n' \
              f'"{response.SUCCESS}"\n' \
              f'"{response.CREATE}"\n' \
              f'"{response.EMPTY}"\n' \
              f'"{response.ERROR}"'


def created(data):
    return response.get_response(
        status=response.CREATE,
        detail=CREATED,
        data=[data],
        status_code=201
    )


def patched(data):
    return response.get_response(
        status=response.SUCCESS,
        detail=PATCHED,
        data=[data],
        status_code=200
    )


def success(data):
    return response.get_response(
        status=response.SUCCESS,
        data=[data],
        status_code=200
    )


def empty():
    return response.get_response(
        status=response.EMPTY,
        status_code=224
    )


def profile_does_not_exist():
    return response.get_response(
        status=response.ERROR,
        detail=DONT_EXIST,
        status_code=400
    )


def profile_is_existing():
    return response.get_response(
        status=response.ERROR,
        detail=IS_EXIST,
        status_code=400
    )