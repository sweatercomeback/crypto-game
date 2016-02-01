if (Meteor.isClient) {

  var defaultPuzzle = 'HQMMPV LXV QF EOVZ KBI ELZY YB FVV OBE PBZX KBIW JLW EQPP PLFY QZFYVLM BS FVVQZX OBE SLFY QY EQPP XB.';
  Session.set('puzzle', defaultPuzzle);

  Template.puzzle.helpers({
    puzzle: function() {
      return Session.get('puzzle');
    },
    solved: function() {
      var puzzle = Session.get('puzzle');
      var replacements = Session.get('letters');
      var puzzleParts = puzzle.split('');
      var solved = [];

      for(var l in puzzleParts) {

        if(puzzleParts[l] === ' ') {
          solved.push(' ');
          continue;
        }
        let rep = _.findWhere(replacements, {key: puzzleParts[l].toUpperCase()});
        if(!rep) {
          solved.push(puzzleParts[l]);
          continue;
        } else if(rep.value === '') {
          solved.push('-');
          continue;
        }

        solved.push(rep.value.toUpperCase());
      }

      return solved.join('');

    }
  });

  Template.puzzle.events({
    "change #thePuzzle": function(e) {
      var puzzle = $(e.currentTarget).val();
      Session.set('puzzle', puzzle);
    }
  })
}
