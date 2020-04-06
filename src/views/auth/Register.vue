<template>
    <form class="card auth-card">
        <div class="card-content">
            <span class="card-title">Домашняя бухгалтерия</span>

            <div class="input-field">
                <input id="email" type="text">
                <label for="email">Email</label>
                <small class="helper-text invalid">Email</small>
            </div>

            <div class="input-field">
                <input id="password" type="password" class="validate">
                <label for="password">Пароль</label>
                <small class="helper-text invalid">Password</small>
            </div>

            <div class="input-field">
                <input id="name" type="text" class="validate">
                <label for="name">Имя</label>
                <small class="helper-text invalid">Name</small>
            </div>

            <label>
                <input type="checkbox"/>
                <span>С правилами согласен</span>
            </label>
        </div>

        <div class="card-action">
            <button class="btn waves-effect waves-light auth-submit">
                Зарегистрироваться
                <i class="material-icons right">send</i>
            </button>

            <p class="center">
                Уже есть аккаунт?
                <a href="/">Войти!</a>
            </p>
        </div>
    </form>
</template>
