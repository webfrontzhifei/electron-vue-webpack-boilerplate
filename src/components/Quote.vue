<style>
  .quote-wrapper{
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.14);
    padding: 2em;
    border: solid 1px gray;
    margin-top: 1em;
  }
</style>

<template>
  <div class="row">
    <div class="quote-wrapper">
      <h2>Random Quote</h2>
      <p>
        {{quote}}
      </p>
    </div>
  </div>
</template>

<script>
  import QuoteService from '../services/quote'

  export default {
    name: 'Quote',

    data () {
      return {
        quote: ''
      }
    },

    ready: function () {
      var quote = QuoteService.getQuote(this).quote
      this.$set('quote', quote)
    }
  }
</script>
