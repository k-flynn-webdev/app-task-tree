<template>
  <div class="task">

    <div class="task__header">
      <div class="task__header__project">
        <p>project</p>
      </div>
      <div class="task__header__user">
        <p>user</p>
      </div>
      <div class="task__header__option">
        <p>option</p>
      </div>
    </div>

    <form>
      <div class="task__form">
        <textarea class="task__form__input" />
        <div class="task__form__send">
          <button>send</button>
        </div>
      </div>
    </form>

    <div class="task__timer"></div>

    <div class="task__items">
      <div class="task__items__item">
        <p class="task__items__task-text">
          task info here
        </p>
        <p class="task__items__task-isDone">
          isDone?
        </p>
      </div>
    </div>

  </div>
</template>
