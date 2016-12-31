<template>
  <div class="top-bar">
    <div class="top-bar-left">
      <ul class="dropdown menu">
        <li class="menu-text my-style">Electron Vue Webpack Boierplate</li>
      </ul>
    </div>
    <div class="top-bar-right">
      <ul class="menu">
        <li>
          <router-link to='/home'>Home</router-link>
        </li>
        <li>
          <router-link to='/about'>About</router-link>
        </li>
        <li>
          <router-link to='/quote'>Quote</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
