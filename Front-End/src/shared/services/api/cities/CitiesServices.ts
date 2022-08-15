import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface ICitiesListing {
  id: number;
  nome: string;
}
export interface ICitiesDetail {
  id: number;
  nome: string;
}
type TCitiesTotalCount = {
  data: ICitiesListing[];
  totalCount: number;
};
const getAll = async (
  page = 1,
  filter = ""
): Promise<TCitiesTotalCount | Error> => {
  try {
    const urlRelativa = `/cidades?_page=${page}&_limit=${Environment.LIMITS_OF_LINES}&nome_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers["x-total-count"] || Environment.LIMITS_OF_LINES
        ),
      };
    }
    return new Error("Erro ao listar os registros");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao listar registros."
    );
  }
};

const getById = async (id: number): Promise<ICitiesDetail | Error> => {
  try {
    const { data } = await Api.get(`/cidades/${id}`);

    if (data) {
      return data;
    }
    return new Error("Erro ao consultar o registro.");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao consultar o registro."
    );
  }
};

const create = async (
  dices: Omit<ICitiesDetail, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<ICitiesDetail>("/cidades", dices);

    if (data) {
      return data.id;
    }
    return new Error("Erro ao criar o registro.");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao criar o registro."
    );
  }
};

const updateById = async (
  id: number,
  dices: ICitiesDetail
): Promise<void | Error> => {
  try {
    await Api.put(`/cidades/${id}`, dices);
    return new Error("Erro ao atualizar o registro.");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar o registro."
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/cidades/${id}`);
    return new Error("Erro ao apagar o registro.");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao apagar o registro."
    );
  }
};

export const CitiesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
