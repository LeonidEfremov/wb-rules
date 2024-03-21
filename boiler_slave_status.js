var b = require("boiler");

var slave_status_device = "wbe2-i-opentherm_boiler_slave";

defineVirtualDevice(slave_status_device, {
  title: "Boiler Slave Status",
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
  whenChanged: ["wbe2-i-opentherm_11/Boiler Status"],
  then: function (newValue, devName, cellName) {

    var lb = (newValue).toString().substring(0, 2);

    dev[slave_status_device]["bit0"] = b.hasFlag(lb, 2);
    dev[slave_status_device]["bit1"] = b.hasFlag(lb, 4);
    dev[slave_status_device]["bit2"] = b.hasFlag(lb, 8);
    dev[slave_status_device]["bit3"] = b.hasFlag(lb, 16);
    dev[slave_status_device]["bit4"] = b.hasFlag(lb, 32);
    dev[slave_status_device]["bit5"] = b.hasFlag(lb, 64);
    dev[slave_status_device]["bit6"] = b.hasFlag(lb, 128);
    dev[slave_status_device]["bit7"] = b.hasFlag(lb, 256);
  }
});
