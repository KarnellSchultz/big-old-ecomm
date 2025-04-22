import { Suspense } from "react"
import { fetchProducts } from "@/app/actions/product-actions"
import ProductList from "./product-list"
import ProductListSkeleton from "./product-list-skeleton"

export const metadata = {
  title: "Featured Products | SportsPro",
  description: "Browse our featured products and special offers",
}

export default async function ApiProductsPage() {
  const apiUrl =
    "https://wae24fd27.api.esales.apptus.cloud/api/storefront/v3/queries/landing-page?channels=ONLINE%7CSTORE&customerKey=103a309a-bcc8-4eae-a7f2-edd7a2550dcb&limit=34&sessionKey=6d459748-f912-4792-b657-7daa353adac3&site=xxl.se&skip=0&stores=528%7C530%7C518%7C504%7C503%7C524%7C515%7C510%7C522%7C514%7C508%7C517%7C526%7C525%7C513%7C529%7C507%7C502%7C516%7C501%7C511%7C523%7C527%7C509%7C519%7C506%7C512%7C521%7C505%7C520&touchpoint=DESKTOP&priceId=member&pageReference=%2Fc%2F100000&locale=sv-SE&market=SE&presentCustom=additionalSalesAccessories%7CadditionalSalesCrossSale%7CadditionalSalesServiceProducts%7CbaseColor%7Cbrand%7Cbreadcrumbs%7CbundledBy%7CbundleBestLeafPrice%7CbundleConfiguration%7Ccampaign%7CcampaignDisclaimerText%7CcampaignIcon%7CcampaignIds%7CcampaignMessage%7CcampaignMessageText%7CcampaignReward%7CcampaignRibbon%7CcampaignSellingPrice%7CcampaignSplash%7CcategoryBreadcrumbCodes%7CcategoryBreadcrumbNames%7CcategoryIds%7CccBuffer%7CcheapestPrice%7Cpim_mandatory_user_string%7Cclassifications%7Cconfigurations%7ChasPrimaryImage%7CisAmmunition%7CisDiscontinued%7CisExcludedFromClickAndCollect%7CisInStockOnline%7CisQuantityToggleEnabled%7CisReleased%7CisReturnable%7CisSoldIndividually%7CisUserSetting%7ClocalizedColorName%7CmemberPrice%7ConlyAvailableInStoreNoClickAndCollect%7ConlyAvailableInStoreNoClickAndCollectLowPrice%7CpackageQuantity%7Cpackage_weight%7CphotoshootModel%7CprimaryCategoryCode%7CproductFamilyProducts%7CproductLink%7CproductStatusCode%7CproductType%7CsalesMethodCode%7CsalesUnit%7Csummary%7Ctags%7CunitConversions%7CUNKNOWN%7Cusps%7Cvendor"

  const products = await fetchProducts(apiUrl)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Featured Products</h1>

      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList products={products} />
      </Suspense>
    </div>
  )
}
