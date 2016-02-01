if (Meteor.isClient) {
  let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split('')
    .map(function(l){
        return {key: l, value: ''}
      });

  Session.set('letters', letters);

  Template.replacement.helpers({
    replacementLetters: function() {
      return Session.get('letters');
    }
  });

  Template.replacement.events({
    "change input": function(e, i) {
      let letters = Session.get('letters');
      let newReplacement = $(e.currentTarget).val().toUpperCase();
      let existingRep = _.findWhere(letters, {value: newReplacement});
      if(!!existingRep) {
        existingRep.value = '';
      }

      let rep = _.findWhere(letters, {key: this.key});

      rep.value = newReplacement;

      Session.set('letters', letters);
    },
    "click .js-clear-replacements": function(){
      let letters = Session.get('letters');
      letters.map(function(l) {
        return l.value = '';
      });
      Session.set('letters', letters);
    }
  })
}
