if (Meteor.isClient) {

  let defaultPuzzle = 'HQMMPV LXV QF EOVZ KBI ELZY YB FVV OBE PBZX KBIW JLW EQPP PLFY QZFYVLM BS FVVQZX OBE SLFY QY EQPP XB.';
  Session.set('puzzle', defaultPuzzle);

  Template.puzzle.helpers({
    puzzle: function() {
      return Session.get('puzzle');
    },
    solved: function() {
      let puzzle = Session.get('puzzle');
      let replacements = Session.get('letters');
      let puzzleParts = puzzle.split('');

      return puzzleParts.reduce(function(solved, l){
        if(l === ' ') {
          solved.push(' ');
          return solved;
        }
        let rep = _.findWhere(replacements, {key: l.toUpperCase()});
        if(!rep) {
          solved.push(l);
          return solved;
        } else if(rep.value === '') {
          solved.push('-');
          return solved;;
        }

        solved.push(rep.value.toUpperCase());
        return solved;
      }, [])
      .join('');
    }

  });

  Template.puzzle.events({
    "change #thePuzzle": function(e) {
      let puzzle = $(e.currentTarget).val();
      Session.set('puzzle', puzzle);
    }
  })
}
