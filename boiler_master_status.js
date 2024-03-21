var b = require("boiler");

var boiler_status_control = "wbe2-i-opentherm_11/Boiler Status";
var master_status_device = "wbe2-i-opentherm_boiler_master";

defineVirtualDevice(master_status_device, {
  title: "Boiler Master Status",
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

    dev[master_status_device]["bit0"] = b.hasFlag(hb, 2);
    dev[master_status_device]["bit1"] = b.hasFlag(hb, 4);
    dev[master_status_device]["bit2"] = b.hasFlag(hb, 8);
    dev[master_status_device]["bit3"] = b.hasFlag(hb, 16);
    dev[master_status_device]["bit4"] = b.hasFlag(hb, 32);
    dev[master_status_device]["bit5"] = b.hasFlag(hb, 64);
    dev[master_status_device]["bit6"] = b.hasFlag(hb, 128);
    dev[master_status_device]["bit7"] = b.hasFlag(hb, 256);
  }
});
