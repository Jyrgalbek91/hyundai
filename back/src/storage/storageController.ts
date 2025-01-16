import { Request, Response } from "express";
import StorageService from "./storageService";
import FileService from "../services/FileService";
import Config from "../utils/config";
import File from "../utils/file";

const PDF_FILE_PATH = Config.PDF_FILE_PATH;

class StorageController {
  async saveFilesController(req: Request, res: Response) {
    try {
      const { vehicle_name } = req.query;

      const pdfFile = req.files?.pdf_file;
      if (!pdfFile)
        return res.status(400).json({ message: "Файл отсутствует" });

      const pdfFileName = Array.isArray(pdfFile)
        ? pdfFile[0].name
        : pdfFile.name;

      const { dbFileName, error } = await FileService.saveFile({
        path: PDF_FILE_PATH,
        fileName: pdfFileName,
        sampleFile: Array.isArray(pdfFile) ? pdfFile[0] : pdfFile,
        type: "file",
        allowTypePrefix: false,
      });
      if (error)
        return res.status(400).json({ message: "Не удалось сохранить файл" });

      const data = await StorageService.saveFiles(
        String(vehicle_name),
        dbFileName
      );
      return data
        ? res.status(200).json({ message: "Успешно сохранено!", data })
        : res.status(400).json({ message: "Ошибка сохранения файла!" });
    } catch (error) {
      console.log("error saveFilesController: ", error.message);
      return false;
    }
  }

  async updateFilesController(req: Request, res: Response) {
    try {
      const { id_file } = req.params;
      const data = req.body;

      if (isNaN(Number(id_file))) {
        return res.status(400).json({ message: "Неверный формат ID" });
      }

      let newPdfFileName: string | null = null;
      const file_name = req.files?.file_name;

      if (file_name) {
        const pdfFileName = Array.isArray(file_name)
          ? file_name[0].name
          : file_name.name;

        const { dbFileName, error } = await FileService.saveFile({
          path: PDF_FILE_PATH,
          fileName: pdfFileName,
          sampleFile: Array.isArray(file_name) ? file_name[0] : file_name,
          type: "file",
          allowTypePrefix: false,
        });

        if (error) {
          return res
            .status(400)
            .json({ message: "Ошибка обновления PDF-файла" });
        }

        newPdfFileName = dbFileName;
      }

      if (newPdfFileName) {
        data.file_name = newPdfFileName;
      }

      const result = await StorageService.updateFiles(Number(id_file), data);
      if (result) {
        return res.status(200).json({ message: "Успешно обновлено" });
      } else {
        return res.status(500).json({ message: "Ошибка обновления" });
      }
    } catch (error) {
      console.error("Error in updateVehicle:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async showFile(req: Request, res: Response) {
    try {
      const fileName = req.params.fileName;
      const path = PDF_FILE_PATH + fileName;
      const existFile = await File.exists(path);
      console.log(await File.exists(path));
      if (existFile) return res.sendFile(path);
      else return res.status(400).json({ message: "Файл не найден" });
    } catch (error) {
      console.log("error showFile: ", error.message);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async deleteStorageController(req: Request, res: Response) {
    const { id_file } = req.params;

    if (isNaN(Number(id_file))) {
      return res.status(400).json({ message: "Неверный формат ID" });
    }

    const result = await StorageService.deleteStorageById(Number(id_file));

    if (result) {
      return res.status(200).json({ message: "Успешно удалено" });
    } else {
      return res.status(500).json({ message: "Ошибка при удалении" });
    }
  }
}

export default new StorageController();