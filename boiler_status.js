var boiler_status_control = "wbe2-i-opentherm_11/Boiler Status";
var slave_status_device = "wbe2-i-opentherm_boiler_slave";
var master_status_device = "wbe2-i-opentherm_boiler_master";

function hasFlag(number, flag) {
  return (number & flag) === flag;
}

defineVirtualDevice(slave_status_device, {
  title: 'Boiler Slave Status',
  cells: {
    bit0: { title: "Fault indication", type: "switch", value: 0, readonly: true },
    bit1: { title: "CH mode", type: "switch", value: 0, readonly: true },
    bit2: { title: "DHW mode", type: "switch", value: 0, readonly: true },
    bit3: { title: "Flame status", type: "switch", value: 0, readonly: true },
    bit4: { title: "Cooling status", type: "switch", value: 0, readonly: true },
    bit5: { title: "CH2 mode", type: "switch", value: 0, readonly: true },
    bit6: { title: "Diagnostic indication", type: "switch", value: 0, readonly: true },
    bit7: { title: "Reserved", type: "switch", value: 0, readonly: true }
  }
});

defineRule("boiler_slave_status", {
  whenChanged: [boiler_status_control],
  then: function (newValue, devName, cellName) {

    var lb = (newValue).toString().substring(0, 2);

    dev[slave_status_device]["bit0"] = hasFlag(lb, 2);
    dev[slave_status_device]["bit1"] = hasFlag(lb, 4);
    dev[slave_status_device]["bit2"] = hasFlag(lb, 8);
    dev[slave_status_device]["bit3"] = hasFlag(lb, 16);
    dev[slave_status_device]["bit4"] = hasFlag(lb, 32);
    dev[slave_status_device]["bit5"] = hasFlag(lb, 64);
    dev[slave_status_device]["bit6"] = hasFlag(lb, 128);
    dev[slave_status_device]["bit7"] = hasFlag(lb, 256);
  }
});

defineVirtualDevice(master_status_device, {
  title: 'Boiler Master Status',
  cells: {
    bit0: { title: "CH enable", type: "switch", value: 0, readonly: true },
    bit1: { title: "DHW enabled", type: "switch", value: 0, readonly: true },
    bit2: { title: "Cooling enabled", type: "switch", value: 0, readonly: true },
    bit3: { title: "OTC active", type: "switch", value: 0, readonly: true },
    bit4: { title: "CH2 enable", type: "switch", value: 0, readonly: true },
    bit5: { title: "Reserved", type: "switch", value: 0, readonly: true },
    bit6: { title: "Reserved", type: "switch", value: 0, readonly: true },
    bit7: { title: "Reserved", type: "switch", value: 0, readonly: true }
  }
});

defineRule("boiler_master_status", {
  whenChanged: [boiler_status_control],
  then: function (newValue, devName, cellName) {

    var hb = (newValue).toString().substring(2, 4);

    dev[master_status_device]["bit0"] = hasFlag(hb, 2);
    dev[master_status_device]["bit1"] = hasFlag(hb, 4);
    dev[master_status_device]["bit2"] = hasFlag(hb, 8);
    dev[master_status_device]["bit3"] = hasFlag(hb, 16);
    dev[master_status_device]["bit4"] = hasFlag(hb, 32);
    dev[master_status_device]["bit5"] = hasFlag(hb, 64);
    dev[master_status_device]["bit6"] = hasFlag(hb, 128);
    dev[master_status_device]["bit7"] = hasFlag(hb, 256);
  }
});
