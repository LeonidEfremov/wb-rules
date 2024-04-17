var b = require("boiler");

var master_status_device = "wbe2-i-opentherm_boiler_master";
var boiler_status = "wbe2-i-opentherm_11/Boiler Status";

defineVirtualDevice(master_status_device, {
  title: "Boiler Master Status",
  cells: {
    bit0: { title: "CH enable", type: "switch", value: false, readonly: true },
    bit1: { title: "DHW enabled", type: "switch", value: false, readonly: true },
    bit2: { title: "Cooling enabled", type: "switch", value: false, readonly: true },
    bit3: { title: "OTC active", type: "switch", value: false, readonly: true },
    bit4: { title: "CH2 enable", type: "switch", value: false, readonly: true },
    bit5: { title: "Reserved", type: "switch", value: false, readonly: true },
    bit6: { title: "Reserved", type: "switch", value: false, readonly: true },
    bit7: { title: "Reserved", type: "switch", value: false, readonly: true }
  }
});

defineRule("boiler_master_status", {
  whenChanged: [boiler_status],
  then: _onChange
});

function _onChange(newValue) {

    var hb = ("0000" + newValue).slice(-4).substring(2, 4);

    dev[master_status_device]["bit0"] = b.hasFlag(hb, 2);
    dev[master_status_device]["bit1"] = b.hasFlag(hb, 4);
    dev[master_status_device]["bit2"] = b.hasFlag(hb, 8);
    dev[master_status_device]["bit3"] = b.hasFlag(hb, 16);
    dev[master_status_device]["bit4"] = b.hasFlag(hb, 32);
    dev[master_status_device]["bit5"] = b.hasFlag(hb, 64);
    dev[master_status_device]["bit6"] = b.hasFlag(hb, 128);
    dev[master_status_device]["bit7"] = b.hasFlag(hb, 256);
};

_onChange(dev[boiler_status]);