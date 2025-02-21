import { world, ItemStack } from "@minecraft/server"
import { ActionFormData, ModalFormData } from "@minecraft/server-ui"

world.afterEvents.itemUse.subscribe(data => {
  const source = data.source

  if (data.itemStack.typeId === "hidden:item_giver") {
    if (!source.hasTag("admin")) {
      source.sendMessage("§c你没有使用许可！")
      return
    }
    
    const ui = new ActionFormData()
    ui.title("Hidden Item Giver")
    ui.body("用/give指令无法获取的物品\n可以使用这个物品获取！\n\n指定需要的物品！")
    ui.button("使用ID给予\n§8直接用ID获得物品")
    ui.button("下界反应堆\n§8minecraft:netherreactor","textures/blocks/reactor_core_stage_0")
    ui.button("发光黒曜石\n§8minecraft:glowingobsidian","textures/blocks/glowing_obsidian")
    ui.button("切石机 (旧)\n§8minecraft:stonecutter","textures/blocks/stonecutter_side")
    ui.button("摄像头 (物品)\n§8minecraft:camera","textures/blocks/camera_front")
    ui.button("摄像头 (方块)\n§8minecraft:item.camera","textures/blocks/camera_front")
    ui.button("§　info_update\n§8minecraft:info_update","textures/blocks/missing_tile")
    ui.button("§　info_update2\n§8minecraft:info_update2","textures/blocks/missing_tile")
    ui.button("§　reserved6\n§8minecraft:reserved6","textures/blocks/missing_tile")
    ui.button("未知\n§8minecraft:unknown","textures/blocks/missing_tile")
    ui.button("隐形基岩\n§8minecraft:invisible_bedrock","textures/blocks/stone")
    ui.button("双台阶\n§8double_stone_block_slab","textures/blocks/stone_slab_side")
    ui.button("末地传送门方块\n§8minecraft:end_portal","textures/blocks/end_portal")
    ui.button("末地折跃门\n§8minecraft:end_gateway","textures/blocks/end_gateway")
    ui.button("传送门方块\n§8minecraft:portal","textures/blocks/portal_placeholder")
    ui.button("红石线\n§8minecraft:redstone_wire","textures/blocks/redstone_dust_cross")
    ui.button("火\n§8minecraft:fire","textures/blocks/fire_0_placeholder")
    ui.button("灵魂火\n§8minecraft:soul_fire","textures/blocks/fire_0_placeholder")
    ui.button("水\n§8minecraft:water","textures/blocks/water_placeholder")
    ui.button("流水\n§8minecraft:flowing_water","textures/blocks/water_placeholder")
    ui.button("溶岩\n§8minecraft:lava","textures/blocks/lava_placeholder")
    ui.button("流动溶岩\n§8minecraft:flowing_lava","textures/blocks/lava_placeholder")
    ui.button("冰霜\n§8minecraft:frosted_ice","textures/blocks/frosted_ice_0")
    ui.button("§　client_request_placeholder_block","textures/blocks/missing_tile")
    ui.button("挂墙的旗帜\n§8minecraft:wall_banner","textures/blocks/wall_banner")
    ui.button("墙上的告示牌\n§8minecraft:wall_sign","textures/blocks/wall_sign")
    ui.button("移动的方块\n§8minecraft:moving_block","textures/blocks/missing_tile")
    ui.button("带蜡烛的蛋糕\n§8minecraft:candle_cake","textures/blocks/candle_cake")
    ui.button("熄灭的红石火把\n§8minecraft:unlit_redstone_torch","textures/blocks/unlit_redstone_torch")
    ui.button("亮起的红石灯\n§8minecraft:lit_redstone_lamp","textures/blocks/lit_redstone_lamp")
    ui.button("亮起的红石矿\n§8minecraft:lit_redstone_ore","textures/blocks/lit_redstone_ore")
    ui.button("亮起的熔炉\n§8minecraft:lit_furnace","textures/blocks/lit_furnace")
    ui.button("亮起的高炉\n§8minecraft:lit_blast_furnace","textures/blocks/lit_blast_furnace")
    ui.button("亮起的烟熏炉\n§8minecraft:lit_smoker","textures/blocks/lit_smoker")
    ui.button("亮起的深板岩红石矿\n§8minecraft:lit_deepslate_redstone_ore","textures/blocks/lit_deepslate_redstone_ore")
    ui.button("未充能的比较器\n§8minecraft:unpowered_comparator","textures/blocks/unpowered_comparator")
    ui.button("未充能的中继器\n§8minecraft:unpowered_repeator","textures/blocks/unpowered_repeater")
    ui.button("充能的比较器\n§8minecraft:powered_comparator","textures/blocks/powered_comparator")
    ui.button("充能的中继器\n§8minecraft:powered_repeater","textures/blocks/powered_repeater")
    ui.button("发光浆果藤1\n§8minecraft:cave_vines_body_with_berries","textures/items/cave_vines_body_with_berries")
    ui.button("发光浆果藤2\n§8minecraft:cave_vines_head_with_berries","textures/items/cave_vines_head_with_berries")
    ui.button("发光浆果藤3\n§8minecraft:cave_vines","textures/block/cave_vines")
    ui.button("空气\n§8minecraft:air","textures/blocks/air")
    ui.button("拌线\n§8minecraft:trip_wire","textures/blocks/trip_wire")
    ui.button("气泡柱\n§8minecraft:bubble_column","textures/blocks/bubble_column")
    ui.button("竹子苗\n§8minecraft:bamboo_sapling","textures/blocks/bamboo")
    ui.button("生成蛋\n§8minecraft:item.spawn_egg","textures/items/spawn_egg")
    ui.button("活塞臂\n§8minecraft:piston_arm_collision","textures/blocks/piston")
    ui.button("细雪\n§8minecraft:powder_snow","textures/blocks/powder_snow")
    ui.show(source).then(({canceled, selection}) => {
      if (canceled) return
      const inventory = source.getComponent("inventory").container

      if (selection === 0) { 
        const ui = new ModalFormData()
        ui.title("隐藏物品获取器")
        ui.textField("请输入您想要获取的物品ID","")
        ui.show(source).then(({canceled, formValues}) => {
          if (canceled) return
          try {
            inventory.addItem(new ItemStack(formValues[0]))
            source.sendMessage("§aOK！")
          } catch(e) {
            source.sendMessage("§cID输入错误")
          }
        })
        return
      }
      if (selection === 1) { inventory.addItem(new ItemStack("minecraft:netherreactor")) }
      if (selection === 2) { inventory.addItem(new ItemStack("minecraft:glowingobsidian")) }
      if (selection === 3) { inventory.addItem(new ItemStack("minecraft:stonecutter")) }
      if (selection === 4) { inventory.addItem(new ItemStack("minecraft:camera")) }
      if (selection === 5) { inventory.addItem(new ItemStack("minecraft:item.camera")) }
      if (selection === 6) { inventory.addItem(new ItemStack("minecraft:info_update")) }
      if (selection === 7) { inventory.addItem(new ItemStack("minecraft:info_update2")) }
      if (selection === 8) { inventory.addItem(new ItemStack("minecraft:reserved6")) }
      if (selection === 9) { inventory.addItem(new ItemStack("minecraft:unknown")) }
      if (selection === 10) { inventory.addItem(new ItemStack("minecraft:invisible_bedrock")) }
      if (selection === 11) { inventory.addItem(new ItemStack("minecraft:double_stone_block_slab")) }
      if (selection === 12) { inventory.addItem(new ItemStack("minecraft:end_portal")) }
      if (selection === 13) { inventory.addItem(new ItemStack("minecraft:end_gateway")) }
      if (selection === 14) { inventory.addItem(new ItemStack("minecraft:portal")) }
      if (selection === 15) { inventory.addItem(new ItemStack("minecraft:redstone_wire")) }
      if (selection === 16) { inventory.addItem(new ItemStack("minecraft:fire")) }
      if (selection === 17) { inventory.addItem(new ItemStack("minecraft:soul_fire")) }
      if (selection === 18) { inventory.addItem(new ItemStack("minecraft:water")) }
      if (selection === 19) { inventory.addItem(new ItemStack("minecraft:flowing_water")) }
      if (selection === 20) { inventory.addItem(new ItemStack("minecraft:lava")) }
      if (selection === 21) { inventory.addItem(new ItemStack("minecraft:flowing_lava")) }
      if (selection === 22) { inventory.addItem(new ItemStack("minecraft:frosted_ice")) }
      if (selection === 23) { inventory.addItem(new ItemStack("minecraft:client_request_placeholder_block")) }
      if (selection === 24) { inventory.addItem(new ItemStack("minecraft:wall_banner")) }
      if (selection === 25) { inventory.addItem(new ItemStack("minecraft:wall_sign"))}
      if (selection === 26) { inventory.addItem(new ItemStack("minecraft:moving_block")) }
      if (selection === 27) { inventory.addItem(new ItemStack("minecraft:candle_cake")) }
      if (selection === 28) { inventory.addItem(new ItemStack("minecraft:unlit_redstone_torch")) }
      if (selection === 29) { inventory.addItem(new ItemStack("minecraft:lit_redstone_lamp"))}
      if (selection === 30) { inventory.addItem(new ItemStack("minecraft:lit_redstone_ore"))}
      if (selection === 31) { inventory.addItem(new ItemStack("minecraft:lit_furnace"))}
      if (selection === 32) { inventory.addItem(new ItemStack("minecraft:lit_blast_furnace"))}
      if (selection === 33) { inventory.addItem(new ItemStack("minecraft:lit_smoker"))}
      if (selection === 34) { inventory.addItem(new ItemStack("minecraft:lit_deepslate_redstone_ore"))}
      if (selection === 35) { inventory.addItem(new ItemStack("minecraft:unpowered_comparator"))}
      if (selection === 36) { inventory.addItem(new ItemStack("minecraft:unpowered_repeater"))}
      if (selection === 37) { inventory.addItem(new ItemStack("minecraft:powered_comparator"))}
      if (selection === 38) { inventory.addItem(new ItemStack("minecraft:powered_repeater"))}
      if (selection === 39) { inventory.addItem(new ItemStack("minecraft:cave_vines_body_with_berries"))}
      if (selection === 40) { inventory.addItem(new ItemStack("minecraft:cave_vines_head_with_berries"))}
      if (selection === 41) { inventory.addItem(new ItemStack("minecraft:cave_vines"))}
      if (selection === 42) { inventory.addItem(new ItemStack("minecraft:air"))}
      if (selection === 43) { inventory.addItem(new ItemStack("minecraft:trip_wire"))}
      if (selection === 44) { inventory.addItem(new ItemStack("minecraft:bubble_column"))}
      if (selection === 45) { inventory.addItem(new ItemStack("minecraft:bamboo_sapling"))}
      if (selection === 46) { inventory.addItem(new ItemStack("minecraft:spawn_egg"))}
      if (selection === 47) { inventory.addItem(new ItemStack("minecraft:piston_arm_collision"))}
      if (selection === 48) { inventory.addItem(new ItemStack("minecraft:powder_snow"))}
      source.sendMessage("§a成功获得！")
    })
    return
  }
})
