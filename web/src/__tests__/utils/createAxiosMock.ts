import MockAdapter from "axios-mock-adapter";
import api from "services/api";

const apiMock = new MockAdapter(api);
