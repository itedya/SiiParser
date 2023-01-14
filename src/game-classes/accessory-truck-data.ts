import SiiUnit from "../decorators/sii-unit";
import SiiAttribute from "../decorators/sii-attribute";
import GameClass from "./game-class";

@SiiUnit("accessory_truck_data")
export class AccessoryTruckData extends GameClass {
    @SiiAttribute("info[]")
    public info: string[];
    public namespace: string;
}