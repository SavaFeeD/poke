<script setup lang="ts">
import { range } from 'lodash';
import { computed, type ComputedRef } from 'vue';


interface IProp {
  location: {
    rooms: (number | string)[][],
  } | null,
}
const props = defineProps<IProp>();

const locationLineMap: ComputedRef<(number | string)[][] | null> = computed(() => {
  if (props.location === null) return null;
  else return signature(props.location.rooms);

  function signature(rooms: (number | string)[][]) {
    const lines: number[][] = range(0, rooms.length - 2).map((_) => [0, 0, 0, 0, 0]);

    lines.map((line, order) => {
      if (rooms[order][0] === 0) {
        line[0] = 0;
      } else {
        line[0] = 2;
      }

      if (rooms[order][1] === 0) {
        line[2] = 0;
      } else {
        line[2] = 2;
      }

      if (rooms[order][2] === 0) {
        line[4] = 0;
      } else {
        line[4] = 2;
      }

      if (line[0] === 0 || line[2] === 0) {
        line[1] = 0;
      } else {
        line[1] = 2;
      }

      if (line[2] === 0 || line[4] === 0) {
        line[3] = 0;
      } else {
        line[3] = 2;
      }

      return line;
    });

    return lines;
  }
});
</script>

<template>
  <div class="map">
    <div
      v-if="location?.rooms && !!location"
      v-for="(roomsRow, roomsRowOrder) in location.rooms"
      :key="`${roomsRow[0]}-${roomsRow[1]}-${roomsRow[2]}-${roomsRowOrder}`"
      class="room-groups"
    >
      <div class="left">
        <div
          class="empty-cell"
          v-if="roomsRow[0] === 0"
        ></div>
        <div
          class="start-room"
          v-else-if="roomsRow[0] === 1"
        ></div>
        <div
          class="finish-room"
          v-else-if="roomsRow[0] === 2"
        ></div>
        <Room
          v-else
          :state="roomsRow[0]"
        />
      </div>
      <div class="center">
        <div
          class="empty-cell"
          v-if="roomsRow[1] === 0"
        ></div>
        <div
          class="start-room"
          v-else-if="roomsRow[1] === 1"
        ></div>
        <div
          class="finish-room"
          v-else-if="roomsRow[1] === 2"
        ></div>
        <Room
          v-else
          :state="roomsRow[1]"
        />
      </div>
      <div class="right">
        <div
          class="empty-cell"
          v-if="roomsRow[2] === 0"
        ></div>
        <div
          class="start-room"
          v-else-if="roomsRow[2] === 1"
        ></div>
        <div
          class="finish-room"
          v-else-if="roomsRow[2] === 2"
        ></div>
        <Room
          v-else
          :state="roomsRow[2]"
        />
      </div>
    </div>
  </div>
  <div class="line-map">
    <div
      v-if="location?.rooms && !!location"
      v-for="(lineRow, lineRowOrder) in locationLineMap"
      :key="`${lineRow[0]}-${lineRow[1]}-${lineRow[2]}-${lineRowOrder}`"
      class="room-groups"
    >
      <div class="left">
        <div
          class="empty-cell"
          v-if="lineRow[0] === 0"
        ></div>
        <MapLine
          v-else
          :state="lineRow[0]"
        />
      </div>
      <div class="left-center">
        <div
          class="empty-cell"
          v-if="lineRow[1] === 0"
        ></div>
        <MapLine
          v-else
          :state="lineRow[1]"
        />
      </div>
      <div class="center">
        <div
          class="empty-cell"
          v-if="lineRow[2] === 0"
        ></div>
        <MapLine
          v-else
          :state="lineRow[2]"
        />
      </div>
      <div class="center-right">
        <div
          class="empty-cell"
          v-if="lineRow[3] === 0"
        ></div>
        <MapLine
          v-else
          :state="lineRow[3]"
        />
      </div>
      <div class="right">
        <div
          class="empty-cell"
          v-if="lineRow[4] === 0"
        ></div>
        <MapLine
          v-else
          :state="lineRow[4]"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.map, .line-map {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 75px;
}
.room-groups {
  z-index: 100;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(3, 75px);
  gap: 75px;
  height: 75px;
}
.line-map {
  z-index: 90;
  transform: translateY(calc(-100% - (75px * 3)));

  .room-groups {
    gap: 0;
    grid-template-columns: repeat(5, 75px);
  }
}
.empty-cell {
  width: 72px;
  height: 72px;
}
</style>