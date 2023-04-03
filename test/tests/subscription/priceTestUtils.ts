import { PriceAndConfigProvider } from "../../../src/subscription/PriceUtils.js"
import { matchers, object, when } from "testdouble"
import { IServiceExecutor } from "../../../src/api/common/ServiceRequest.js"
import { UpgradePriceService } from "../../../src/api/entities/sys/Services.js"
import { createPlanPrices } from "../../../src/api/entities/sys/TypeRefs.js"

export const PLAN_PRICES = {
	PremiumBusiness: createPlanPrices({
		additionalUserPriceMonthly: "2.40",
		contactFormPriceMonthly: "24.00",
		firstYearDiscount: "0",
		includedAliases: "5",
		includedStorage: "1",
		monthlyPrice: "2.40",
		monthlyReferencePrice: "2.40",
	}),
	Premium: createPlanPrices({
		additionalUserPriceMonthly: "1.20",
		contactFormPriceMonthly: "24.00",
		firstYearDiscount: "0",
		includedAliases: "5",
		includedStorage: "1",
		monthlyPrice: "1.20",
		monthlyReferencePrice: "1.20",
	}),
	Pro: createPlanPrices({
		additionalUserPriceMonthly: "4.80",
		contactFormPriceMonthly: "24.00",
		firstYearDiscount: "0",
		includedAliases: "20",
		includedStorage: "10",
		monthlyPrice: "8.40",
		monthlyReferencePrice: "8.40",
	}),
	TeamsBusiness: createPlanPrices({
		additionalUserPriceMonthly: "3.60",
		contactFormPriceMonthly: "24.00",
		firstYearDiscount: "0",
		includedAliases: "5",
		includedStorage: "10",
		monthlyPrice: "6.00",
		monthlyReferencePrice: "6.00",
	}),
	Teams: createPlanPrices({
		additionalUserPriceMonthly: "2.40",
		contactFormPriceMonthly: "24.00",
		firstYearDiscount: "0",
		includedAliases: "5",
		includedStorage: "10",
		monthlyPrice: "4.80",
		monthlyReferencePrice: "4.80",
	}),
}

/**
 * gives a real PriceAndConfigProvider with mocked data
 */
export async function createPriceMock(planPrices: typeof PLAN_PRICES = PLAN_PRICES): Promise<PriceAndConfigProvider> {
	const executorMock = object<IServiceExecutor>()
	when(executorMock.get(UpgradePriceService, matchers.anything())).thenResolve({
		premiumPrices: planPrices.Premium,
		premiumBusinessPrices: planPrices.PremiumBusiness,
		teamsPrices: planPrices.Teams,
		teamsBusinessPrices: planPrices.TeamsBusiness,
		proPrices: planPrices.Pro,
	})
	return await PriceAndConfigProvider.getInitializedInstance(null, executorMock)
}