export default {
  template: '{{ $ctrl.shortName }}',
  controller(UnitService) {
    'ngInject';

    this.$onChanges = () => {
      UnitService.getUnit(this.unitId)
        .then((unit) => {
          this.shortName = unit && unit.shortName;
        });
    };
  },
  bindings: {
    unitId: '<',
  },
};
