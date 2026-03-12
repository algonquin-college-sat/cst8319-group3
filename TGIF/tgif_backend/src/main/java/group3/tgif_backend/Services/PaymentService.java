package group3.tgif_backend.Services;

import com.paypal.http.HttpResponse;
import com.paypal.orders.*;
import com.paypal.core.PayPalHttpClient;
import com.paypal.core.PayPalEnvironment;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PaymentService {

    private final PayPalHttpClient client;

    public PaymentService(@Value("${paypal.client-id}") String clientId,
                          @Value("${paypal.client-secret}") String secret) {
        // Use Sandbox for testing, change to Live for production
        PayPalEnvironment environment = new PayPalEnvironment.Sandbox(clientId, secret);
        this.client = new PayPalHttpClient(environment);
    }

    /**
     * Replaces Stripe Session Creation
     */
    public String createPaymentOrder(Double amount, String currency) {
        OrderRequest orderRequest = new OrderRequest();
        orderRequest.checkoutPaymentIntent("CAPTURE");

        AmountWithBreakdown amountWithBreakdown = new AmountWithBreakdown()
                .currencyCode(currency.toUpperCase())
                .value(String.format("%.2f", amount));

        PurchaseUnitRequest purchaseUnitRequest = new PurchaseUnitRequest()
                .amountWithBreakdown(amountWithBreakdown);

        orderRequest.purchaseUnits(List.of(purchaseUnitRequest));

        OrdersCreateRequest request = new OrdersCreateRequest().requestBody(orderRequest);

        try {
            HttpResponse<Order> response = client.execute(request);
            return response.result().links().stream()
                    .filter(link -> "approve".equals(link.rel()))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("No approval link found"))
                    .href();
        } catch (IOException e) {
            log.error("PayPal Create Order Error: {}", e.getMessage());
            throw new RuntimeException("PayPal communication failed");
        }
    }

    /**
     * Logic to finalize payment (The "Capture" step)
     */
    public boolean captureOrder(String orderId) {
        OrdersCaptureRequest request = new OrdersCaptureRequest(orderId);
        try {
            HttpResponse<Order> response = client.execute(request);
            String status = response.result().status();
            log.info("PayPal Order {} capture status: {}", orderId, status);

            return "COMPLETED".equals(status);
        } catch (IOException e) {
            log.error("PayPal Capture Error: {}", e.getMessage());
            return false;
        }
    }
}