<script setup lang="ts">
import { range } from 'lodash';
import { computed, type ComputedRef, ref, type Ref, onMounted } from 'vue';


interface IProp {
  location: {
    rooms: (number | string)[][],
  } | null,
}
const props = defineProps<IProp>();

const locationLineMap: ComputedRef<(number | string)[][] | null> = computed(() => {
  if (props.location === null) return null;
  else return signature(props.location.rooms);

  function CountType(lineArr: number[], searchType: number) {
    let count = 0;
    lineArr.forEach((el) => {
      if (el === searchType) {
        count++;
      }
    });
    return count;
  }

  function CountNotNull(lineArr: (number | string)[]) {
    let count = 0;
    lineArr.forEach((el) => {
      if (+el !== 0) {
        count++;
      }
    });
    return count;
  }

  function signature(rooms: (number | string)[][]) {
    const lines: number[][] = range(0, rooms.length -1).map((_) => [0, 0, 0, 0, 0]);

    lines.map((line, order) => {

      // line down [+]
      [0, 1, 2].forEach((i) => {
        if (rooms[order][i] === 0) {
          line[(i * 2)] = 0;
        } else {
          line[(i * 2)] = 2;
        }
      });

      // line forward [+]
      [0, 1, 2].forEach((i) => {
        if (rooms[order+1][i] !== 0) {
          line[(i * 2)] = 2;
        }
      });

      // line [#, ?, #, #, #]
      if (line[0] === 0 || line[2] === 0) {
        line[1] = 0;
      } else {
        line[1] = 9;
      }
      // line [#, #, #, ?, #]
      if (line[2] === 0 || line[4] === 0) {
        line[3] = 0;
      } else {
        line[3] = 9;
      }

      // line type is [+] is count 1 equil type 1 [|]
      if (CountType(line, 2) === 1) {
        line[line.findIndex((n) => n === 2)] = 1;
      }

      if (CountType(line, 9) === 1) {
        const idx = line.findIndex((n) => n === 9);
        const roomOrderIndex = rooms[order].findIndex((nI) => nI !== 0);
        const roomOrderIndexNext = rooms[order+1].findIndex((nI) => nI !== 0);

        if (CountNotNull(rooms[order]) === 1 && CountNotNull(rooms[order+1]) === 1) {
          if (idx > 2) {
            if (roomOrderIndex === 1) {
              line[idx - 1] = 7;
              line[idx + 1] = 5;
            }
            if (roomOrderIndex === 2) {
              line[idx - 1] = 8;
              line[idx + 1] = 6;
            }
          }
          if (idx < 2) {
            if (roomOrderIndex === 1) {
              line[idx - 1] = 8;
              line[idx + 1] = 6;
            }
            if (roomOrderIndex === 0) {
              line[idx - 1] = 7;
              line[idx + 1] = 5;
            }
          }
        }
        
        if (CountNotNull(rooms[order]) === 1 && CountNotNull(rooms[order+1]) === 2) {          
          if ((idx > 2 && roomOrderIndex === 2) || (roomOrderIndex === 1 && rooms[order+1][1] !== 0 && idx < 2)) {
            line[idx + 1] = 4;
            line[idx - 1] = 8;
          }
          if ((idx < 2 && roomOrderIndex === 0) || (roomOrderIndex === 1 && rooms[order+1][1] !== 0 && idx > 2)) {
            line[idx + 1] = 5;
            line[idx - 1] = 3;
          }
        }

        if (CountNotNull(rooms[order]) === 2 && CountNotNull(rooms[order+1]) === 1) {          
          if ((idx > 2 && roomOrderIndexNext === 2) || (roomOrderIndexNext === 1 && rooms[order][1] !== 0 && idx < 2)) {
            line[idx + 1] = 4;
            line[idx - 1] = 7;
          }
          if ((idx < 2 && roomOrderIndexNext === 0) || (roomOrderIndexNext === 1 && rooms[order][1] !== 0 && idx > 2)) {
            line[idx + 1] = 6;
            line[idx - 1] = 3;
          }
        }
      }

      if (CountType(line, 9) === 2) {
        line[0] = 3;
        line[4] = 4;

        if (rooms[order][0] === 0 && rooms[order+1][0] !== 0) {
          line[0] = 8;
        }
        if (rooms[order][0] !== 0 && rooms[order+1][0] === 0) {
          line[0] = 7;
        }
        if (rooms[order][2] === 0 && rooms[order+1][0] !== 0) {
          line[4] = 5;
        }
        if (rooms[order][2] !== 0 && rooms[order+1][0] === 0) {
          line[4] = 6;
        }

        if (rooms[order][1] === 0 && rooms[order+1][1] !== 0) {
          line[2] = 10;
        }
        if (rooms[order][1] !== 0 && rooms[order+1][1] === 0) {
          line[2] = 11;
        }
      }
      

      return line;
    });

    return lines;
  }
});

const refMap = ref();
const refOixr = ref();

onMounted(() => {
  refOixr.value.style.maxHeight = `${refMap.value.clientHeight + 50}px`;
});
</script>

<template>
  <div class="oixr" ref="refOixr">
    <div class="map" ref="refMap">
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
  transform: translateY(calc(-100% - (75px * 1)));

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