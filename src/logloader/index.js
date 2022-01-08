import { generateRealArray } from '../util/logsorter';
import { append } from '../three/append';
import { createScene } from '../three/scene';
import { setCamera } from '../three/camera';
import { render } from '../three/responsive';
import { generateCollies } from '../three/collies';

export const useLoaderState = (loadingState, setLoading, setLoaded, transportUnit) => {
  let w,
    h,
    l,
    box,
    wpivot,
    hpivot,
    lpivot,
    weightpivot,
    spaceInHeight,
    spaceInWidth,
    spaceInLength = true,
    plan,
    totalLdm = 0,
    timeout = 50,
    timeoutPositioning = 100;

  let positionx = -1.225,
    positiony = 1,
    positionz = -6.8;

  async function promising() {
    await new Promise((resolve) => setTimeout(resolve, timeoutPositioning));
  }

  async function promisingPositioning() {
    await new Promise((resolve) => setTimeout(resolve, timeout));
  }

  /**
   * First block positioning
   * @param cargoarr
   * @param plans
   * @param scene
   * @return {Promise<{plans: *[], cargoarr: *[]}>}
   */
  const firstPositioning = async (cargoarr = [], plans = [], scene) => {
    w = parseFloat(cargoarr[0].width) / 100;
    h = parseFloat(cargoarr[0].height) / 100;
    l = parseFloat(cargoarr[0].length) / 100;
    const clonedObject = Object.assign({}, cargoarr[0]);
    clonedObject.height_free = 2.7 - h;
    clonedObject.width_free = 2.45 - w;
    clonedObject.z = positionz;
    clonedObject.x = positionx;
    clonedObject.alreadylength = 0;
    plans.push(clonedObject);
    positionx += w / 2;
    positionz += l / 2;
    cargoarr.shift();
    box = generateCollies(w, h, l, '', cargoarr[0].index);
    box.position.x = positionx;
    box.position.z = positionz;
    box.position.y = 1 + (h - 1) / 2;
    totalLdm += l;
    scene.add(box);
    return { plans: plans, cargoarr: cargoarr };
  };

  /**
   * Add a block by height
   * @param plans
   * @param cargoarr
   * @param pivot
   * @param scene
   * @return {Promise<{plans: *[], cargoarr: *[]}>}
   */
  const addByHeight = async (plans, cargoarr, pivot, scene) => {
    spaceInHeight = false;
    const intPlan = [...plans];
    const cargoarrInt = [...cargoarr];
    for (let ph = 0; ph < intPlan.length; ph++) {
      h = 0;
      plan = intPlan[ph];
      for (h = pivot; h < cargoarrInt.length; h++) {
        wpivot = parseFloat(cargoarrInt[h].width) / 100;
        hpivot = parseFloat(cargoarrInt[h].height) / 100;
        lpivot = parseFloat(cargoarrInt[h].length) / 100;
        weightpivot = parseFloat(cargoarrInt[h].weight);
        if (
          plan.height_free.toFixed(2) >= hpivot &&
          plan.weight > weightpivot / 2 &&
          parseFloat(plan.width) / 100 > wpivot - 0.1 &&
          parseFloat(plan.length) / 100 > lpivot - 0.1
        ) {
          positiony = 1 + (hpivot - 1) / 2 + (2.7 - plan.height_free);
          positionx = plan.x + wpivot / 2;
          positionz = plan.z + lpivot / 2;
          box = generateCollies(wpivot, hpivot, lpivot, '', cargoarr[h].index);
          box.position.x = positionx;
          box.position.z = positionz;
          box.position.y = positiony;
          scene.add(box);
          if (parseFloat(plan.length) / 100 !== lpivot || parseFloat(plan.width) / 100 !== wpivot) {
            await promisingPositioning();
            const cargoaddheight = Object.assign({}, cargoarrInt[h]);
            cargoaddheight.height_free = plan.height_free - hpivot;
            cargoaddheight.width_free = plan.width_free - wpivot;
            cargoaddheight.maxlength = parseFloat(plan.length) / 100 - lpivot;
            cargoaddheight.z = plan.z;
            cargoaddheight.alreadylength = 1;
            cargoaddheight.x = plan.x;
            cargoaddheight.width_height = 1;
            intPlan.push(cargoaddheight);
          } else {
            await promisingPositioning();
            const cargoaddheight = Object.assign({}, cargoarrInt[h]);
            cargoaddheight.height_free = plan.height_free - hpivot;
            cargoaddheight.width_free = 0;
            cargoaddheight.z = plan.z;
            cargoaddheight.alreadylength = 1;
            cargoaddheight.x = plan.x;
            intPlan.push(cargoaddheight);
            plan.height_free = 0;
          }
          cargoarrInt.splice(h, 1);
          spaceInHeight = true;
          return { plans: intPlan, cargoarr: cargoarrInt };
        }
      }
      if (ph === intPlan.length - 1 && h === cargoarrInt.length) {
        return { plans: intPlan, cargoarr: cargoarrInt };
      }
    }
  };

  /**
   * Add a block by width
   * @param plans
   * @param cargoarr
   * @param pivot
   * @param scene
   * @return {Promise<{plans: *[], cargoarr: *[]}>}
   */
  const addByWidth = async (plans, cargoarr, pivot, scene) => {
    const intPlan = [...plans];
    const cargoarrInt = [...cargoarr];
    spaceInWidth = false;
    w = pivot;
    for (var pw = 0; pw < intPlan.length; pw++) {
      plan = intPlan[pw];
      for (w = pivot; w < cargoarrInt.length; w++) {
        wpivot = parseFloat(cargoarrInt[w].width) / 100;
        hpivot = parseFloat(cargoarrInt[w].height) / 100;
        lpivot = parseFloat(cargoarrInt[w].length) / 100;
        weightpivot = parseFloat(cargoarrInt[w].weight);
        if (plan.width_height !== undefined && plan.width_height === 1) {
          if (plan.width_free >= wpivot && plan.height_free.toFixed(2) > hpivot) {
            positionx = plan.x + parseFloat(plan.width) / 100;
            positionx += wpivot / 2;
            positionz = plan.z;
            positionz += lpivot / 2;
            plan.width_free = 0;
            box = generateCollies(wpivot, hpivot, lpivot, '', cargoarr[w].index);
            box.position.x = positionx;
            box.position.z = positionz;
            box.position.y = 1 + (hpivot - 1) / 2 + (2.7 - plan.height_free);
            scene.add(box);
            await promisingPositioning();
            const cargoaddwidth = Object.assign({}, cargoarrInt[w]);
            cargoaddwidth.height_free = plan.height_free;
            cargoaddwidth.width_free = plan.width_free - wpivot;
            cargoaddwidth.alreadylength = 1;
            cargoaddwidth.width_height = 1;
            cargoaddwidth.maxlength = plan.maxlength;
            cargoaddwidth.z = plan.z;
            cargoaddwidth.x = positionx - wpivot / 2;
            intPlan.push(cargoaddwidth);
            cargoarrInt.splice(h, 1);
            spaceInWidth = true;
            return { plans: intPlan, cargoarr: cargoarrInt };
          }
        } else {
          if (plan.width_free >= wpivot) {
            positionx = plan.x + parseFloat(plan.width) / 100;
            positionx += wpivot / 2;
            positionz = plan.z;
            positionz += lpivot / 2;
            plan.width_free = 0;
            box = generateCollies(wpivot, hpivot, lpivot, '', cargoarr[w].index);
            box.position.x = positionx;
            box.position.z = positionz;
            box.position.y = 1 + (hpivot - 1) / 2;
            scene.add(box);
            const cargoaddwidth = Object.assign({}, cargoarrInt[w]);
            cargoaddwidth.height_free = 2.7 - hpivot;
            cargoaddwidth.width_free = plan.width_free - wpivot;
            if (lpivot >= parseFloat(plan.length) / 100) {
              cargoaddwidth.alreadylength = 1;
            } else {
              cargoaddwidth.alreadylength = 0;
              cargoaddwidth.length_free_width = parseFloat(plan.length) / 100 - lpivot;
            }
            cargoaddwidth.z = plan.z;
            cargoaddwidth.x = positionx - wpivot / 2;
            intPlan.push(cargoaddwidth);
            cargoarrInt.splice(h, 1);
            spaceInWidth = true;
            return { plans: intPlan, cargoarr: cargoarrInt };
          }
        }
      }
      if (pw === intPlan.length - 1 && w === cargoarrInt.length) {
        return { plans: intPlan, cargoarr: cargoarrInt };
      }
    }
  };

  /**
   * Add a block by length
   * @param plans
   * @param cargoarr
   * @param pivot
   * @param scene
   * @return {Promise<{plans: *[], cargoarr: *[]}>}
   */
  const addByLength = async (plans, cargoarr, pivot, scene) => {
    const intPlan = [...plans];
    const cargoarrInt = [...cargoarr];
    spaceInLength = false;
    l = pivot;
    for (var pl = 0; pl < intPlan.length; pl++) {
      plan = intPlan[pl];
      for (l = pivot; l < cargoarrInt.length; l++) {
        wpivot = parseFloat(cargoarrInt[l].width) / 100;
        hpivot = parseFloat(cargoarrInt[l].height) / 100;
        lpivot = parseFloat(cargoarrInt[l].length) / 100;
        weightpivot = parseFloat(cargoarrInt[l].weight);
        if (plan.maxlength !== undefined) {
          if (
            plan.maxlength.toFixed(2) > lpivot &&
            plan.height_free.toFixed(2) > hpivot &&
            plan.width > wpivot
          ) {
            positionz = plan.z + parseFloat(plan.length) / 100;
            positionx = plan.x;
            positionx += wpivot / 2;
            box = generateCollies(wpivot, hpivot, lpivot, '', cargoarrInt[l].index);
            box.position.x = positionx;
            box.position.z = positionz + lpivot / 2;
            box.position.y = 1 + (hpivot - 1) / 2 + (2.7 - plan.height_free);
            scene.add(box);
            await promisingPositioning();
            const cargoaddlength = Object.assign({}, cargoarrInt[l]);
            cargoaddlength.height_free = plan.height_free - hpivot;
            cargoaddlength.width_free = plan.width_free - wpivot;
            cargoaddlength.z = positionz;
            cargoaddlength.x = positionx - wpivot / 2;
            cargoaddlength.alreadylength = 0;
            cargoaddlength.maxlength = plan.maxlength - lpivot;
            intPlan.push(cargoaddlength);
            plan.alreadylength = 1;
            cargoarrInt.splice(l, 1);
            spaceInLength = true;
            return { plans: intPlan, cargoarr: cargoarrInt };
          }
        } else {
          if (totalLdm + lpivot < 13.6 && plan.alreadylength === 0) {
            console.log(lpivot);
            console.log(plan.length_free_width);
            if (plan.length_free_width !== undefined && plan.length_free_width > lpivot) {
              plan.alreadylength = 1;
              positionz = plan.z + parseFloat(plan.length) / 100;
              positionx = -1.225 + parseFloat(plan.width) / 100;
              positionx += wpivot / 2;
              spaceInLength = true;
              box = generateCollies(wpivot, hpivot, lpivot, '', cargoarrInt[l].index);
              box.position.x = positionx;
              box.position.z = positionz + lpivot / 2;
              box.position.y = 1 + (hpivot - 1) / 2;
              scene.add(box);
              await promisingPositioning();
              const cargoaddlength = Object.assign({}, cargoarrInt[l]);
              cargoaddlength.height_free = 2.7 - hpivot;
              cargoaddlength.width_free = 2.45 - wpivot;
              cargoaddlength.z = positionz;
              cargoaddlength.x = positionx - wpivot / 2;
              cargoaddlength.alreadylength = 0;
              cargoaddlength.length_free_width = plan.length_free_width - lpivot;
              intPlan.push(cargoaddlength);
              cargoarrInt.splice(l, 1);
              return { plans: intPlan, cargoarr: cargoarrInt };
            } else if (plan.alreadylength === 0 && plan.length_free_width === undefined) {
              plan.alreadylength = 1;
              totalLdm += lpivot;
              positionz = plan.z + parseFloat(plan.length) / 100;
              positionx = -1.225;
              positionx += wpivot / 2;
              spaceInLength = true;
              box = generateCollies(wpivot, hpivot, lpivot, '', cargoarrInt[l].index);
              box.position.x = positionx;
              box.position.z = positionz + lpivot / 2;
              box.position.y = 1 + (hpivot - 1) / 2;
              scene.add(box);
              await promisingPositioning();
              const cargoaddlength = Object.assign({}, cargoarrInt[l]);
              cargoaddlength.height_free = 2.7 - hpivot;
              cargoaddlength.width_free = 2.45 - wpivot;
              cargoaddlength.z = positionz;
              cargoaddlength.x = positionx - wpivot / 2;
              cargoaddlength.alreadylength = 0;
              intPlan.push(cargoaddlength);
              cargoarrInt.splice(l, 1);
              return { plans: intPlan, cargoarr: cargoarrInt };
            }
          }
        }
      }
      if (pl === intPlan.length - 1 && l === cargoarrInt.length) {
        if (!spaceInLength && !spaceInWidth && !spaceInHeight && cargoarrInt.length > 0) {
          cargoarrInt.splice(l - 1, 1);
        }
        return { plans: intPlan, cargoarr: cargoarrInt };
      }
    }
  };

  /**
   * Run the loading
   * @return {Promise<void>}
   */
  const runLoader = async () => {
    setLoading(true);
    let result;
    const arr = await generateRealArray(loadingState.rows);
    const { scene } = await createScene(transportUnit);
    result = await firstPositioning(arr, [], scene);
    const { camera, controls, renderer } = await setCamera();
    await render(scene, camera, renderer);
    await append(renderer, scene, camera, controls);
    setLoaded(true);

    while (result.cargoarr.length > 0) {
      await promising();
      do {
        result = await addByHeight(result.plans, result.cargoarr, 0, scene);
        if (result.cargoarr.length === 0) {
          break;
        }
      } while (spaceInHeight);

      await promising();
      do {
        result = await addByWidth(result.plans, result.cargoarr, 0, scene);
        if (result.cargoarr.length === 0) {
          break;
        }
      } while (spaceInWidth);

      await promising();
      do {
        result = await addByHeight(result.plans, result.cargoarr, 0, scene);
        if (result.cargoarr.length === 0) {
          break;
        }
      } while (spaceInHeight);
      await promising();
      result = await addByLength(result.plans, result.cargoarr, 0, scene);
      if (result.cargoarr.length === 0) {
        break;
      }
      await promising();
    }
    await promising();
    setLoading(false);
  };

  return {
    runLoader
  };
};
