import os from "os";
import si from "systeminformation"; // npm install systeminformation

const getOperatingSystem = () =>
  `Operating system: ${os.type()} ${os.release()}`;

const getArchitecture = () => `Architecture: ${os.arch()}`;

const getCurrentUser = () => `Current user name: ${os.userInfo().username}`;

const getCpuModels = () => {
  const cpuModels = os.cpus().map((cpu) => cpu.model);
  return `CPU cores models: ${[...new Set(cpuModels)]}`;
};

const getCpuTemperature = async () =>
  `CPU temperature: ${(await si.cpuTemperature()).main}`;

const getGraphicsControllers = async () => {
  const graphicsControllers = (await si.graphics()).controllers;
  return `Graphic controllers vendors and models: ${graphicsControllers
    .map((gc) => `${gc.vendor} ${gc.model}`)
    .join(", ")}`;
};

const getMemoryInfo = () => {
  const totalMemory = os.totalmem() / 1024 ** 3;
  const freeMemory = os.freemem() / 1024 ** 3;
  const usedMemory = totalMemory - freeMemory;
  return `Total memory: ${totalMemory.toFixed(
    2
  )} GB\nUsed memory: ${usedMemory.toFixed(
    2
  )} GB\nFree memory: ${freeMemory.toFixed(2)} GB`;
};

const getBatteryInfo = async () => {
  const battery = await si.battery();
  return `Battery: charging = ${battery.isCharging}, percent = ${battery.percent}, remaining time = ${battery.timeRemaining}`;
};

async function printSystemInfo() {
  const interval = parseInt(process.argv[2]) * 1000;

  const systemInfoTexts = await Promise.all([
    getOperatingSystem(),
    getArchitecture(),
    getCurrentUser(),
    getCpuModels(),
    getCpuTemperature(),
    getGraphicsControllers(),
    getMemoryInfo(),
    getBatteryInfo(),
  ]);

  for (const text of systemInfoTexts) {
    console.log(text);
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
}

printSystemInfo().catch(console.error);
